package AD

import (
	"fmt"
	"log"
	"strings"

	"github.com/go-ldap/ldap/v3"
)

type ComputerResult struct {
	Name string `json:"name"`
	OU string `json:"ou"`
}

// Finds all computers under the URMC domain that match the search
func ComputersSearch(search string) (matches []ComputerResult) {
	fmt.Println(search)

	l, err := ConnectToServer("LDAP://urmc-sh.rochester.edu/")
	fmt.Println(err)
	defer l.Close()

	searchRequest := ldap.NewSearchRequest(
		"DC=urmc-sh,DC=rochester,DC=edu",
		ldap.ScopeWholeSubtree,
		ldap.NeverDerefAliases,
		0, // Max search size 1500
		0, // No timeout for search
		false,
		fmt.Sprintf("(&(objectClass=computer)(name=%s*))", search), //Filter
		[]string{"name", "distinguishedName"},                      // Attributes
		nil,
	)

	results, _ := l.Search(searchRequest)

	for _, entry := range results.Entries {

		ou := strings.ReplaceAll(entry.GetAttributeValue("distinguishedName"), "OU=", "")
		ou = strings.ReplaceAll(ou, "DC=", "")
		name := entry.GetAttributeValue("name")

		matches = append(matches, ComputerResult{name, ou})
	}

	err = l.Unbind()
	if err != nil {
		log.Fatal(err)
	}

	return
}
