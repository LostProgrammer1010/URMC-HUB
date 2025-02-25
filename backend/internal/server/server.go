package server

import (
	"log"

	"github.com/go-ldap/ldap/v3"
)

func ConnectToServer(URL string) (l *ldap.Conn, err error) {

	// Connect to Server
	l, err = ldap.DialURL(URL)
	if err != nil {
		log.Fatal(err)
	}

	// Bind to the server (Allows for searching)
	//err = l.Bind(fmt.Sprintf("URMC-sh\\%s", username), password)

	return

}
