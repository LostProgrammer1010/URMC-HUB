package AD

import (
	"fmt"
	"log"
	"time"

	"github.com/go-ldap/ldap/v3"
)

// Finds all groups matching the search
func GroupsSearch(search string) (matches []string) {
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
		fmt.Sprintf("(&(objectClass=group)(cn=%s*))", search), //Filter
		[]string{"*"}, // Attributes
		nil,
	)

	results, _ := l.Search(searchRequest)

	for _, entry := range results.Entries {

		for _, attribute := range entry.Attributes {
			fmt.Println(attribute.Name, attribute.Values)
			time.Sleep(3 * time.Second)

			fmt.Println()

		}

	}

	err = l.Unbind()
	if err != nil {
		log.Fatal(err)
	}

	return
}
