package AD

import (
	"backend/internal/utils"
	"fmt"
	"log"
	"strings"

	"github.com/go-ldap/ldap/v3"
)

type Computer struct {
	Name string `json:"name"`
	OU   string `json:"ou"`
	Type string `json:"type"`
}

// Finds all computers under the URMC domain that match the search
func ComputersSearch(search string) (matches []Computer, err error) {
	matches = make([]Computer, 0)

	l, err := ConnectToServer("LDAP://urmc-sh.rochester.edu/")

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
		0, // Max search size 1500
		0, // No timeout for search
		false,
		fmt.Sprintf("(&(objectClass=computer)(name=%s*))", search), //Filter
		[]string{"name", "distinguishedName"},                      // Attributes
		nil,
	)

	results, err := l.Search(searchRequest)

	if err != nil {
		return
	}

	for _, entry := range results.Entries {
		var computer Computer

		computer.OU = strings.ReplaceAll(entry.GetAttributeValue("distinguishedName"), "OU=", "")
		computer.OU = strings.ReplaceAll(computer.OU, "DC=", "")
		computer.Name = entry.GetAttributeValue("name")
		computer.Type = "computer"

		matches = append(matches, computer)
	}

	err = l.Unbind()

	if err != nil {
		return
	}

	return
}
