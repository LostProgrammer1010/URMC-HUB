package AD

import (
	"fmt"
	"log"
	"strconv"
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
	Relationship    string         `json:"relationship"`
	Description     string         `json:"description"`
	Location        string         `json:"location"`
	FirstName       string         `json:"firstname"`
	SecondName      string         `json:"lastname"`
	LockoutInfo     []ServerResult `json:"lockoutInfo"`
}

func UserInfoSearch(username string) (user UserResult) {

	l, err := ConnectToServer("LDAP://urmc-sh.rochester.edu/")
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
		fmt.Sprintf("(&(objectClass=user)(SAMAccountName=%s))", username), //Filter
		[]string{"cn", "samaccountname", "uid", "urid", "mail", "telephoneNumber", "department", "title", "distinguishedName", "pwdlastset", "urrolestatus", "description", "physicalDeliveryOfficeName", "givenName", "sn"}, // Attributes
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
	user.Relationship = entry.GetAttributeValue("URRoleStatus")
	user.Description = entry.GetAttributeValue("description")
	user.Location = entry.GetAttributeValue("physicalDeliveryOfficeName")
	user.FirstName = entry.GetAttributeValue("givenName")
	user.SecondName = entry.GetAttributeValue("sn")
	user.LockoutInfo = LockoutInfoData(username)

	return
}

func LockoutInfoData(user string) (matches []ServerResult) {
	fmt.Println(user)
	// maybe implement channels, it's very fast in its current state
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
	fmt.Print(server + " | ")
	fmt.Print(entry.DN + " | ")

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
	fmt.Println(formattedTime)

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