package AD

import (
	"backend/internal/api/post"
	"fmt"
	"log"
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

type GroupResult struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Info        string `json:"info"`
}

type UserResult struct {
	Name            string            `json:"name"`
	Username        string            `json:"username"`
	NetID           string            `json:"netID"`
	URID            string            `json:"URID"`
	Email           string            `json:"email"`
	Phone           string            `json:"phone"`
	Department      string            `json:"department"`
	Title           string            `json:"title"`
	OU              string            `json:"ou"`
	LastPasswordSet string            `json:"lastPasswordSet"`
	Relationship    []string          `json:"relationship"`
	Description     string            `json:"description"`
	Location        string            `json:"location"`
	FirstName       string            `json:"firstname"`
	SecondName      string            `json:"lastname"`
	Groups          []GroupResult     `json:"groups"`
	LockoutInfo     []ServerResult    `json:"lockoutInfo"`
	ShareDrive      []post.ShareDrive `json:"sharedrives"`
}

func UserInfoSearch(username string, domain string) (user UserResult) {

	l, err := ConnectToServer(fmt.Sprintf("LDAP://%s.rochester.edu/", domain))
	if err != nil {
		fmt.Println(err)
	}

	defer l.Close()

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

	results, _ := l.Search(searchRequest)

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
	user.OU = entry.GetAttributeValue("distinguishedName")
	user.LastPasswordSet = entry.GetAttributeValue("pwdLastSet")
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
			if share := post.CheckGroupForShareDrive(groupName); share != nil && !CheckForDuplicate(user.ShareDrive, *share, groupName) {
				user.ShareDrive = append(user.ShareDrive, *share)
			}

			user.Groups = append(user.Groups, GroupInfo(groupName, l, domain)) // append results
		}()
	}
	wg.Wait()

	fmt.Printf("%v\n", user.ShareDrive)

	if domain == "urmc-sh" {
		user.LockoutInfo = LockoutInfoData(username)
	} else {
		user.LockoutInfo = []ServerResult{}
	}

	return
}

func GroupInfo(group string, l *ldap.Conn, domain string) (result GroupResult) {

	searchRequest := ldap.NewSearchRequest(
		fmt.Sprintf("DC=%s,DC=rochester,DC=edu", domain),
		ldap.ScopeWholeSubtree,
		ldap.NeverDerefAliases,
		1, // Max search size 1
		0, // No timeout for search
		false,
		fmt.Sprintf("(&(objectClass=group)(cn=%s))", group), //Filter
		[]string{"cn", "description", "info"},               // Attributes
		nil,
	)

	results, _ := l.Search(searchRequest)

	if results == nil {
		result.Name = group
		return
	}
	entry := results.Entries[0]

	result.Name = entry.GetAttributeValue("cn")
	result.Description = entry.GetAttributeValue("description")
	result.Info = entry.GetAttributeValue("info")

	return
}

func LockoutInfoData(user string) (matches []ServerResult) {
	var servers = [...]string{"AD22PDC01", "AD22PDC02", "AD22PDC03", "AD22PDC04", "AD22PDC05", "AD22SDC01", "AD22SDC02", "AD22SDC03", "AD22SDC04", "AD22SDC05"}

	var wg sync.WaitGroup // create a wait group

	for _, server := range servers { // loop through servers
		wg.Add(1)
		go func() {
			defer wg.Done()
			matches = append(matches, ServerLockout(server, user)) // append results
		}()
	}

	wg.Wait()

	return
}

func ServerLockout(server string, user string) ServerResult {
	l, err := ConnectToServer("LDAP://" + server)
	if err != nil {
		fmt.Println(err)
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
	badpwtime, _ := strconv.Atoi(entry.GetAttributeValue("badPasswordTime"))

	// Nanoseconds since 1601-01-01
	ticks := int64(badpwtime)

	// Calculate seconds and nanoseconds offset from Unix epoch (1970)
	seconds := ticks/10000000 - 11644473600
	nanoseconds := (ticks % 10000000) * 100

	// Create time.Time object
	t := time.Unix(seconds, nanoseconds).Local()

	// Format the time as a string
	formattedTime := t.Format("Jan 02 2006 15:04:05")

	err = l.Unbind()
	if err != nil {
		log.Fatal(err)
	}

	if t.Format("2006") == "1600" {
		return ServerResult{server, count, "No prior attempt"}
	} else {
		return ServerResult{server, count, formattedTime}
	}
}

func CheckForDuplicate(sharedrive []post.ShareDrive, found post.ShareDrive, group string) bool {

	for _, share := range sharedrive {
		if strings.EqualFold(share.Drive, found.Drive) {
			share.Group = append(share.Group, group)
			return true
		}
	}

	return false
}
