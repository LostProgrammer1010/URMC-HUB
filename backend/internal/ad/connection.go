package ad

import (
	"fmt"
	"log"

	"github.com/LostProgrammer1010/URMC-HUB/internal/global"
	"github.com/go-ldap/ldap/v3"
)

func connectToLDAP() (l *ldap.Conn, err error) {

	l, err = ldap.DialURL("ldap://URMC-sh.rochester.edu/")

	if err != nil {
		log.Fatal(err)
		return
	}

	err = l.Bind(fmt.Sprintf("URMC-sh\\%s", global.Username), global.Password)

	return
}
