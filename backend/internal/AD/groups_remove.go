package AD

import (
	"fmt"

	"github.com/go-ldap/ldap/v3"
)

func GroupsRemove(user string, group string) (response string) {

	// Connect to server
	l, err := ConnectToServer("LDAP://urmc-sh.rochester.edu/")
	fmt.Println(err)
	defer l.Close()

	// Create search request for user
	searchRequest := ldap.NewSearchRequest(
	"DC=urmc-sh,DC=rochester,DC=edu",
    ldap.ScopeWholeSubtree,
	ldap.NeverDerefAliases,
	0,
	0,
	false,
    "(&(objectClass=user)(sAMAccountName="+user+"))", // Filter
    []string{"dn"},
    nil,
    )
    sr, err := l.Search(searchRequest)
    if err != nil || len(sr.Entries) == 0 {
        fmt.Println(err)
    }
    userDN := sr.Entries[0].DN

	// Create search request for group
	searchRequest = ldap.NewSearchRequest(
	"DC=urmc-sh,DC=rochester,DC=edu",
    ldap.ScopeWholeSubtree,
	ldap.NeverDerefAliases,
	0,
	0,
	false,
    "(&(objectClass=group)(cn="+group+"))", // Filter
    []string{"dn"},
    nil,
    )
    sr, err = l.Search(searchRequest)
    if err != nil || len(sr.Entries) == 0 {
        fmt.Println(err)
    }
    groupDN := sr.Entries[0].DN

	// Log the action
	fmt.Printf("Removing: %s\n%s", groupDN, userDN)
	// Create delete request for group
	deleteRequest := ldap.NewModifyRequest(groupDN, nil)
    deleteRequest.Delete("member", []string{userDN})
    err = l.Modify(deleteRequest)
    if err != nil {
        fmt.Println(err)
    }
	response = ""
	return
}