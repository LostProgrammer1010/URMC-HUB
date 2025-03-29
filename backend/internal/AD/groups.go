package AD

import (
	"fmt"
	"strings"

	"github.com/go-ldap/ldap/v3"
)

type Group struct {
	Type        string `json:"type"`
	Name        string `json:"name"`
	OU          string `json:"ou"`
	Info        string `json:"info"`
	Description string `json:"description"`
}

// Finds all groups matching the search
func GroupsSearch(search string) (matches []Group, err error) {
	matches = make([]Group, 0)
	l, err := ConnectToServer("LDAP://urmc-sh.rochester.edu/")

	if err != nil {
		return
	}

	defer l.Close()
	defer l.Unbind()

	searchRequest := ldap.NewSearchRequest(
		"DC=urmc-sh,DC=rochester,DC=edu",
		ldap.ScopeWholeSubtree,
		ldap.NeverDerefAliases,
		0,
		0,
		false,
		fmt.Sprintf("(&(objectClass=group)(cn=%s*))", search),                  //Filter
		[]string{"distinguishedName", "sAMAccountName", "description", "info"}, // Attributes
		nil,
	)

	results, err := l.Search(searchRequest)

	if results == nil || err != nil {
		return
	}

	for _, entry := range results.Entries {
		var group Group

		group.OU = strings.ReplaceAll(entry.GetAttributeValue("distinguishedName"), "OU=", "")
		group.OU = strings.ReplaceAll(group.OU, "DC=", "")
		group.OU = strings.ReplaceAll(group.OU, "CN=", "")
		group.Name = entry.GetAttributeValue("sAMAccountName")
		group.Info = entry.GetAttributeValue("info")
		group.Description = entry.GetAttributeValue("description")
		group.Type = "group"

		matches = append(matches, group)
	}

	return
}
