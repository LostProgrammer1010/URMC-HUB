package AD

import (
	"fmt"

	"github.com/go-ldap/ldap/v3"
)

func GroupsAdd(users []string, groups []string) (response []GroupModifyResult) {

	// Connect to server
	l, err := ConnectToServer("LDAP://urmc-sh.rochester.edu/")
	if err != nil {
		fmt.Println(err)
	}
	defer l.Close()

	usersDN := GetUsersDN(users, l)
	groupsDN := GetGroupsDN(groups, l)

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
