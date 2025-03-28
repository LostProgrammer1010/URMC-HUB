package AD

import (
	"fmt"
	"log"
	"strings"

	"github.com/go-ldap/ldap/v3"
)

// Object sent back to frontend to display of user
type User struct {
	Type     string `json:"type"`
	Name     string `json:"name"`
	Username string `json:"username"`
	OU       string `json:"ou"`
	Disabled bool   `json:"disabled"`
}

// Finds all users under the URMC domain that match the search
func UsersSearch(search string, domain string) (matches []User) {
	matches = make([]User, 0)
	l, err := ConnectToServer(fmt.Sprintf("LDAP://%s.rochester.edu/", domain))
	if err != nil {
		fmt.Println(err)
	}
	defer l.Close()

	searchRequest := ldap.NewSearchRequest(
		fmt.Sprintf("DC=%s,DC=rochester,DC=edu", domain),
		ldap.ScopeWholeSubtree,
		ldap.NeverDerefAliases,
		0,
		0,
		false,
		fmt.Sprintf("(&(objectClass=user)(|(anr=%s)(URID=%s)))", search, search),          //Filter
		[]string{"cn", "distinguishedName", "name", "sAMAccountName"}, // Attributes
		nil,
	)

	results, _ := l.Search(searchRequest)

	if results == nil {
		return
	}

	for _, entry := range results.Entries {
		var user User
		user.OU = strings.ReplaceAll(entry.GetAttributeValue("distinguishedName"), "OU=", "")
		user.OU = strings.ReplaceAll(user.OU, "DC=", "")
		user.OU = strings.ReplaceAll(user.OU, "CN=", "")

		user.Disabled = strings.Contains(strings.ToLower(user.OU), "disabled accounts")
		user.Username = entry.GetAttributeValue("sAMAccountName")
		user.Name = entry.GetAttributeValue("name")
		user.Type = "user"
		matches = append(matches, user)

	}

	err = l.Unbind()
	if err != nil {
		log.Fatal(err)
	}

	return
}
