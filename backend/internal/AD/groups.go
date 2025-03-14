package AD

import (
	"fmt"
	"log"
	"strings"

	"github.com/go-ldap/ldap/v3"
)

type Group struct {
	Type string `json:"type"`
	Name string `json:"name"`
	OU   string `json:"ou"`
}

// Finds all groups matching the search
func GroupsSearch(search string) (matches []Group) {

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
		fmt.Sprintf("(&(objectClass=group)(cn=%s*))", search), //Filter
		[]string{"distinguishedName", "sAMAccountName"},       // Attributes
		nil,
	)

	results, _ := l.Search(searchRequest)

	for _, entry := range results.Entries {
		var group Group

		group.OU = strings.ReplaceAll(entry.GetAttributeValue("distinguishedName"), "OU=", "")
		group.OU = strings.ReplaceAll(group.OU, "DC=", "")
		group.OU = strings.ReplaceAll(group.OU, "CN=", "")
		group.Name = entry.GetAttributeValue("sAMAccountName")
		group.Type = "group"

		matches = append(matches, group)
	}

	err = l.Unbind()
	if err != nil {
		log.Fatal(err)
	}

	return
}
