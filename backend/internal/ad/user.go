package ad

import (
	"fmt"

	"github.com/LostProgrammer1010/URMC-HUB/internal/models"
	"github.com/go-ldap/ldap/v3"
)

func SearchAllUsers(searchValue string) (matches []models.UserSimpleInfo, err error) {

	matches = make([]models.UserSimpleInfo, 0)

	l, err := connectToLDAP()

	if err != nil {
		return
	}

	defer l.Close()
	defer l.Unbind()

	searchRequest := ldap.NewSearchRequest(
		"DC=URMC-sh,DC=rochester,DC=edu",
		ldap.ScopeWholeSubtree, ldap.NeverDerefAliases, 0, 0, false,
		fmt.Sprintf("(&(objectCategory=user)(|(anr=%s)(URID=%s)))", searchValue, searchValue),
		[]string{"cn", "name", "sAMAccountName", "distinguishedName"},
		nil,
	)

	results, err := l.Search(searchRequest)

	fmt.Println(results.Entries)
	fmt.Println(err)

	if results == nil || err != nil {
		return
	}

	for _, entry := range results.Entries {
		matches = append(matches, models.UserSimpleInfo{
			Type:     "user",
			Name:     entry.GetAttributeValue("cn"),
			Username: entry.GetAttributeValue("sAMAccountName"),
			OU:       entry.GetAttributeValue("distinguishedName"),
		})
	}

	return
}
