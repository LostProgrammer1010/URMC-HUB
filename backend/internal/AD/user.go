package AD

import (
	"backend/internal/global"
	"fmt"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/go-ldap/ldap/v3"
)

type ServerResult struct {
	Name  string `json:"name"`
	Count int    `json:"count"`
	Time  string `json:"time"`
}

type UserResult struct {
	Name            string         `json:"name"`
	Username        string         `json:"username"`
	NetID           string         `json:"netID"`
	URID            string         `json:"URID"`
	Email           string         `json:"email"`
	Phone           string         `json:"phone"`
	Department      string         `json:"department"`
	Title           string         `json:"title"`
	OU              string         `json:"ou"`
	LastPasswordSet string         `json:"lastPasswordSet"`
	Relationship    []string       `json:"relationship"`
	Description     string         `json:"description"`
	Location        string         `json:"location"`
	FirstName       string         `json:"firstname"`
	SecondName      string         `json:"lastname"`
	Groups          []GroupResult  `json:"groups"`
	LockoutInfo     []ServerResult `json:"lockoutInfo"`
	ShareDrive      []ShareDrive   `json:"sharedrives"`
}

func UserInfoSearch(username string, domain string) (user UserResult, err error) {

	l, err := ConnectToServer(fmt.Sprintf("LDAP://%s.rochester.edu/", domain))

	if err != nil {
		return
	}

	defer l.Close()
	defer l.Unbind()

	searchRequest := ldap.NewSearchRequest(
		fmt.Sprintf("DC=%s,DC=rochester,DC=edu", domain),
		ldap.ScopeWholeSubtree,
		ldap.NeverDerefAliases,
		1, // Max search size 1
		0, // No timeout for search
		false,
		fmt.Sprintf("(&(objectClass=user)(SAMAccountName=%s))", username), //Filter
		[]string{"cn", "samaccountname", "uid", "urid", "mail", "telephoneNumber", "department", "title", "distinguishedName", "pwdlastset", "urrolestatus", "description", "physicalDeliveryOfficeName", "givenName", "sn", "memberOf"}, // Attributes
		nil,
	)

	results, err := l.Search(searchRequest)

	if results == nil || err != nil {
		return
	}

	entry := results.Entries[0]

	// Capitalization Matters!
	user.Name = entry.GetAttributeValue("cn")
	user.Username = entry.GetAttributeValue("sAMAccountName")
	user.NetID = entry.GetAttributeValue("uid")
	user.URID = entry.GetAttributeValue("URID")
	user.Email = entry.GetAttributeValue("mail")
	user.Phone = entry.GetAttributeValue("telephoneNumber")
	user.Department = entry.GetAttributeValue("department")
	user.Title = entry.GetAttributeValue("title")
	user.OU = strings.ReplaceAll(entry.GetAttributeValue("distinguishedName"), "OU=", "")
	user.OU = strings.ReplaceAll(user.OU, "DC=", "")
	user.OU = strings.ReplaceAll(user.OU, "CN=", "")
	user.LastPasswordSet = timeConvert(entry.GetAttributeValue("pwdLastSet"))
	user.Relationship = entry.GetAttributeValues("URRoleStatus")
	user.Description = entry.GetAttributeValue("description")
	user.Location = entry.GetAttributeValue("physicalDeliveryOfficeName")
	user.FirstName = entry.GetAttributeValue("givenName")
	user.SecondName = entry.GetAttributeValue("sn")
	groups := entry.GetAttributeValues("memberOf")

	var wg sync.WaitGroup          // create a wait group
	for _, group := range groups { // loop through groups
		wg.Add(1)
		go func() {
			defer wg.Done()
			groupName := strings.Split(group[3:], ",")[0]
			share, err := CheckGroupForShareDrive(groupName)
			if err != nil {
				return
			}
			if share != nil && !CheckForDuplicate(user.ShareDrive, *share, groupName) {
				user.ShareDrive = append(user.ShareDrive, *share)
			}
			info, err := GroupInfo(groupName, l, domain)
			if err != nil {
				return
			}
			user.Groups = append(user.Groups, info) // append results
		}()
	}
	wg.Wait()

	if domain == "urmc-sh" {
		user.LockoutInfo = LockoutInfoData(username)
	} else {
		user.LockoutInfo = []ServerResult{}
	}

	return
}

func LockoutInfoData(user string) (matches []ServerResult) {
	var servers = [...]string{global.SERVER1, global.SERVER2, global.SERVER3, global.SERVER4, global.SERVER5, global.SERVER6, global.SERVER7, global.SERVER8, global.SERVER9, global.SERVER10}

	var wg sync.WaitGroup // create a wait group

	for _, server := range servers { // loop through servers
		wg.Add(1)
		go func() {
			defer wg.Done()
			result, err := ServerLockout(server, user)
			if err != nil {
				return
			}
			matches = append(matches, *result) // append results
		}()
	}

	wg.Wait()

	sort.Slice(matches, func(i, j int) bool {
		return matches[i].Name < matches[j].Name
	})

	return
}

func ServerLockout(server string, user string) (*ServerResult, error) {
	l, err := ConnectToServer("LDAP://" + server)

	if err != nil {
		return nil, err
	}
	defer l.Close()

	searchRequest := ldap.NewSearchRequest(
		"DC=urmc-sh,DC=rochester,DC=edu",
		ldap.ScopeWholeSubtree,
		ldap.NeverDerefAliases,
		1, // Max search size 1
		0, // No timeout for search
		false,
		fmt.Sprintf("(&(objectClass=user)(SAMAccountName=%s*))", user), //Filter
		[]string{"badPwdCount", "badPasswordTime"},                     // Attributes
		nil,
	)

	results, _ := l.Search(searchRequest)

	entry := results.Entries[0]

	count, _ := strconv.Atoi(entry.GetAttributeValue("badPwdCount"))
	formattedTime := timeConvert(entry.GetAttributeValue("badPasswordTime"))

	err = l.Unbind()

	if err != nil {
		return nil, err
	}
	serverResult := new(ServerResult)
	serverResult.Name = server
	serverResult.Count = count
	serverResult.Time = formattedTime
	return serverResult, nil
}

func CheckForDuplicate(sharedrive []ShareDrive, found ShareDrive, group string) bool {

	for _, share := range sharedrive {
		if strings.EqualFold(share.Drive, found.Drive) {
			share.Group = append(share.Group, group)
			return true
		}
	}

	return false
}

func timeConvert(input string) (output string) {
	ts, _ := strconv.Atoi(input)
	// Nanoseconds since 1601-01-01
	ticks := int64(ts)
	// Calculate seconds and nanoseconds offset from Unix epoch (1970)
	seconds := ticks/10000000 - 11644473600
	nanoseconds := (ticks % 10000000) * 100
	// Create time.Time object
	t := time.Unix(seconds, nanoseconds)
	if !t.IsDST() {
		t = t.Add(time.Hour)
	}
	if t.Format("2006") == "1600" {
		output = "None"
	} else {
		// Format the time as a string
		output = t.Format("01/02/2006 15:04:05")
	}
	return
}
