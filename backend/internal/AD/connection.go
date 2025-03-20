package AD

import (
	"backend/internal/creds"
	"backend/internal/utils"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"github.com/go-ldap/ldap/v3"
	"golang.org/x/term"
)


func ConnectToServer(URL string) (l *ldap.Conn, err error) {

	// Connect to Server
	l, err = ldap.DialURL(URL)
	if err != nil {
		log.Fatal(err)
	}

	// Bind to the server (Allows for searching)
	if URL[7] == 'A' { // checking if domain is an AD server
		err = l.Bind(fmt.Sprintf("urmc-sh\\%s", creds.Username), creds.Password)
		return
	}

	err = l.Bind(fmt.Sprintf("%s\\%s", strings.Split(URL[7:], ".")[0], creds.Username), creds.Password)

	return

}

// Prompts for username and password
func Login() {

	for invalidCredential := true; invalidCredential; {

		fmt.Println("Enter AD Username: ")
		fmt.Scan(&creds.Username)

		fmt.Println("Enter Password: ")
		temp, _ := term.ReadPassword(int(os.Stdin.Fd()))
		creds.Password = string(temp[:])

		l, err := ConnectToServer("LDAP://urmc-sh.rochester.edu/")

		if err != nil {
			fmt.Println("Invaid Username or Password")
			time.Sleep(1 * time.Second)
			utils.ClearTerm()
			continue
		}

		if creds.Username == "" || creds.Password == "" {
			log.Fatal("Server will not start with out credentials")
		}

		invalidCredential = false
		l.Unbind()
		l.Close()

	}
	utils.ClearTerm()
}
