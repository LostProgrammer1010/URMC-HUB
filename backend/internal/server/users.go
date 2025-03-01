package server

import (
	"backend/internal/AD"
	"fmt"
	"log"
	"strings"

	"github.com/go-ldap/ldap/v3"
)

func SearchUsers(search string) (matches []string) {
	fmt.Println(search)

	l, err := AD.ConnectToServer("LDAP://urmc-sh.rochester.edu/")
	fmt.Println(err)
	defer l.Close()

	searchRequest := ldap.NewSearchRequest(
		"DC=urmc-sh,DC=rochester,DC=edu",
		ldap.ScopeWholeSubtree,
		ldap.NeverDerefAliases,
		0, // Max search size 1500
		0, // No timeout for search
		false,
		fmt.Sprintf("(&(objectClass=user)(|(SAMAccountName=%s*)(givenName=%s*)(sn=%s*)))", search, search, search), //Filter
		[]string{"cn", "distinguishedName", "name", "sAMAccountName"},                                              // Attributes
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

	err = l.Unbind()
	if err != nil {
		log.Fatal(err)
	}

	return
}
