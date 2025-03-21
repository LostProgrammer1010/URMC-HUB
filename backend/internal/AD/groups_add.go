package AD

import (
	"fmt"

	"github.com/go-ldap/ldap/v3"
)

func GroupsAdd(users []string, groups []string) (response GroupModifyResult) {

	response.Successful = true
	response.Message = "All changes completed"
	// Connect to server
	l, err := ConnectToServer("LDAP://urmc-sh.rochester.edu/")
	fmt.Println(err)
	defer l.Close()

	usersDN := GetUsersDN(users, l)	
	groupsDN := GetGroupsDN(groups, l)

	// Log the action
	fmt.Printf("Adding: %s\n%s", groupsDN, usersDN)

	// Create delete request for each group
	for _, group := range groupsDN {
		addRequest := ldap.NewModifyRequest(group, nil)
	    addRequest.Add("member", usersDN)
	    err = l.Modify(addRequest)
	    if err != nil {
	        fmt.Println(err)
			response.Successful = false
			response.Message = err.Error()
	    }
	}

	if response.Successful {
		response.Message = "All changes completed"
	}
	return
}