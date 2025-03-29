package AD

import (
	"fmt"

	"github.com/go-ldap/ldap/v3"
)

type GroupModifyResult struct {
	Group      string `json:"group"`
	Message    string `json:"message"`
	Successful bool   `json:"successful"`
}

func GroupsRemove(users []string, groups []string) (response []GroupModifyResult, err error) {

	// Connect to server
	l, err := ConnectToServer("LDAP://urmc-sh.rochester.edu/")

	if err != nil {
		return
	}

	defer l.Close()
	defer l.Unbind()

	usersDN, err := GetUsersDN(users, l)
	if err != nil {
		return
	}
	groupsDN, err := GetGroupsDN(groups, l)
	if err != nil {
		return
	}

	// Log the action
	fmt.Printf("Removing: %s\n%s", groupsDN, usersDN)

	// Create delete request for each group
	for _, group := range groupsDN {

		groupResult := new(GroupModifyResult)
		groupResult.Group = group
		groupResult.Successful = true
		groupResult.Message = "All changes completed"
		deleteRequest := ldap.NewModifyRequest(group, nil)
		deleteRequest.Delete("member", usersDN)
		err = l.Modify(deleteRequest)
		if err != nil {
			fmt.Println("Failed to remove user from " + group)
			groupResult.Successful = false
			groupResult.Message += err.Error()
			response = append(response, *groupResult)
			continue
		}
		response = append(response, *groupResult)
	}
	return
}

func GetUsersDN(users []string, l *ldap.Conn) (usersDN []string, err error) {

	for _, user := range users {
		// Create search request for user
		searchRequest := ldap.NewSearchRequest(
			"DC=urmc-sh,DC=rochester,DC=edu",
			ldap.ScopeWholeSubtree,
			ldap.NeverDerefAliases,
			0,
			0,
			false,
			"(&(objectClass=user)(SAMaccountName="+user+"))", // Filter
			[]string{"dn"},
			nil,
		)
		sr, err := l.Search(searchRequest)

		if err != nil || len(sr.Entries) == 0 {
			break
		}
		usersDN = append(usersDN, sr.Entries[0].DN)
	}
	return
}

func GetGroupsDN(groups []string, l *ldap.Conn) (groupsDN []string, err error) {

	for _, group := range groups {
		// Create search request for group
		searchRequest := ldap.NewSearchRequest(
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
		sr, err := l.Search(searchRequest)
		if err != nil || len(sr.Entries) == 0 {
			break
		}
		groupsDN = append(groupsDN, sr.Entries[0].DN)
	}
	return
}
