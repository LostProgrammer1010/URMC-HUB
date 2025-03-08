package AD

import (
	"fmt"
	"log"
	"strings"

	"github.com/go-ldap/ldap/v3"
)

/*
	Not working

I have to figure out how our trust relationship works with UR domain.
Attempting to connect with our AD creds. to UR domain give invaild credentials
*/

// Deprecated: This function does not work. Do not use!!
func URUsersSearch(search string) (matches []string) {
	fmt.Println(search)

	l, err := ConnectToServer("LDAP://UR.rochester.edu")
	fmt.Println(err)
	defer l.Close()

	searchRequest := ldap.NewSearchRequest(
		"DC=ur,DC=rochester,DC=edu",
		ldap.ScopeWholeSubtree,
		ldap.NeverDerefAliases,
		0,
		0,
		false,
		"(&(objectClass=user)(|(SAMAccountName=*)(givenName=*)(sn=*)))",
		[]string{"cn", "distinguishedName", "name", "sAMAccountName"},
		nil,
	)

	results, _ := l.Search(searchRequest)

	for _, entry := range results.Entries {

		ou := strings.ReplaceAll(entry.GetAttributeValue("distinguishedName"), "OU=", "")
		ou = strings.ReplaceAll(ou, "DC=", "")
		username := entry.GetAttributeValue("sAMAccountName")
		fullName := entry.GetAttributeValue("name")

		matches = append(matches, fmt.Sprintf("%s | %s | %s", username, fullName, ou))
	}

	fmt.Println(matches)

	err = l.Unbind()
	if err != nil {
		log.Fatal(err)
	}

	return
}
