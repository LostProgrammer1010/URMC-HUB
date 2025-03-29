package AD

import (
	"fmt"

	"github.com/go-ldap/ldap/v3"
)

func GroupsAdd(users []string, groups []string) (response []GroupModifyResult, err error) {

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
	fmt.Printf("Adding: %s\n%s", groupsDN, usersDN)

	// Create delete request for each group
	for _, group := range groupsDN {
		groupResult := new(GroupModifyResult)
		groupResult.Group = group
		groupResult.Successful = true
		groupResult.Message = "All changes completed"
		addRequest := ldap.NewModifyRequest(group, nil)
		addRequest.Add("member", usersDN)
		err = l.Modify(addRequest)
		if err != nil {
			fmt.Printf("Failed to add user to %s\n", group)
			groupResult.Successful = false
			groupResult.Message = err.Error()
			response = append(response, *groupResult)
			continue
		}
		response = append(response, *groupResult)
	}

	return
}
