package AD

import (
	"fmt"
	"log"
	"strings"

	"github.com/go-ldap/ldap/v3"
)

// Object sent back to frontend to display of user
type User struct {
	Name     string `json:"name"`
	Username string `json:"username"`
	OU       string `json:"ou"`
}

// Addition information about a user
type Additon struct {
	User         User     `json:"user"`
	NetID        string   `json:"netid"`
	URID         string   `json:"urid"`
	Email        string   `json:"email"`
	Phone        string   `json:"phone"`
	Title        string   `json:"title"`
	Department   string   `json:"department"`
	Location     string   `json:"location"`
	Relationship string   `json:"relationship"`
	MemberOf     []string `json:"memberof"`
}

// Finds all users under the URMC domain that match the search
func UsersSearch(search string) (matches []User) {

	l, err := ConnectToServer("LDAP://urmc-sh.rochester.edu/")
	fmt.Println(err)
	defer l.Close()

	searchRequest := ldap.NewSearchRequest(
		"DC=urmc-sh,DC=rochester,DC=edu",
		ldap.ScopeWholeSubtree,
		ldap.NeverDerefAliases,
		0,
		0,
		false,
		fmt.Sprintf("(&(objectClass=user)(|(SAMAccountName=%s*)(givenName=%s*)(sn=%s*)))", search, search, search), //Filter
		[]string{"cn", "distinguishedName", "name", "sAMAccountName"},                                              // Attributes
		nil,
	)

	results, _ := l.Search(searchRequest)

	for _, entry := range results.Entries {
		var user User
		user.OU = strings.ReplaceAll(entry.GetAttributeValue("distinguishedName"), "OU=", "")
		user.OU = strings.ReplaceAll(user.OU, "DC=", "")
		user.OU = strings.ReplaceAll(user.OU, "CN=", "")
		user.Username = entry.GetAttributeValue("sAMAccountName")
		user.Name = entry.GetAttributeValue("name")
		matches = append(matches, user)
	}

	err = l.Unbind()
	if err != nil {
		log.Fatal(err)
	}

	return
}
