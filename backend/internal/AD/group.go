package AD

import (
	"fmt"

	"github.com/go-ldap/ldap/v3"
)

func GroupInfo(group string, l *ldap.Conn, domain string) (result GroupResult) {

	searchRequest := ldap.NewSearchRequest(
		fmt.Sprintf("DC=%s,DC=rochester,DC=edu", domain),
		ldap.ScopeWholeSubtree,
		ldap.NeverDerefAliases,
		1, // Max search size 1
		0, // No timeout for search
		false,
		fmt.Sprintf("(&(objectClass=group)(cn=%s))", group), //Filter
		[]string{"cn", "description", "info"},               // Attributes
		nil,
	)

	results, _ := l.Search(searchRequest)

	if results == nil {
		result.Name = group
		return
	}
	entry := results.Entries[0]

	result.Name = entry.GetAttributeValue("cn")
	result.Description = entry.GetAttributeValue("description")
	result.Info = entry.GetAttributeValue("info")

	return
}
