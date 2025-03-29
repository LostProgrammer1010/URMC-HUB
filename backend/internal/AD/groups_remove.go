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

func GroupsRemove(users []string, groups []string) (response []GroupModifyResult) {

	// Connect to server
	l, err := ConnectToServer("LDAP://urmc-sh.rochester.edu/")
	fmt.Println(err)
	defer l.Close()

	usersDN := GetUsersDN(users, l)
	groupsDN := GetGroupsDN(groups, l)

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
			fmt.Println(err)
			groupResult.Successful = false
			groupResult.Message += err.Error()
			response = append(response, *groupResult)
			continue
		}
		response = append(response, *groupResult)
	}
	return
}

func GetUsersDN(users []string, l *ldap.Conn) (usersDN []string) {
	for _, user := range users {
		// Create search request for user
		fmt.Println(user)
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
			fmt.Println(err)
		}
		usersDN = append(usersDN, sr.Entries[0].DN)
	}
	return
}

func GetGroupsDN(groups []string, l *ldap.Conn) (groupsDN []string) {

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
			fmt.Println(err)
		}
		groupsDN = append(groupsDN, sr.Entries[0].DN)
	}
	return
}
