package AD

import (
	"backend/internal/utils"
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
func GroupsSearch(search string) (matches []Group, err error) {
	var l *ldap.Conn
	matches = make([]Group, 0)

	l, err = ConnectToServer("LDAP://urmc-sh.rochester.edu/")

	if err != nil {
		if strings.Contains(err.Error(), "Invalid") {
			utils.ClearTerm()
			fmt.Println("Server Shutting Down")
			log.Fatal(err)
			return
		}
		return

	}

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

	results, err := l.Search(searchRequest)

	if err != nil {
		return
	}

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
		return
	}

	return
}
