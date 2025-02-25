package server

import (
	"backend/internal/utils"
	"fmt"
	"log"
	"os"
	"time"

	"golang.org/x/term"
)

var username, password string

// Prompts for username and password
func Login() {

	for invalidCredential := true; invalidCredential; {

		fmt.Println("Enter AD Username: ")
		fmt.Scan(&username)

		fmt.Println("Enter Password: ")
		temp, _ := term.ReadPassword(int(os.Stdin.Fd()))
		password = string(temp[:])

		l, err := ConnectToServer("LDAP://urmc-sh.rochester.edu/")

		if err != nil {
			fmt.Println("Invaid Username or Password")
			time.Sleep(1 * time.Second)
			utils.ClearTerm()
			continue
		}

		if username == "" || password == "" {
			log.Fatal("Server will not start with out credentials")
		}

		invalidCredential = false
		l.Unbind()
		l.Close()

	}
	utils.ClearTerm()
}
