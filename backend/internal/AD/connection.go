package AD

import (
	"backend/internal/utils"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/go-ldap/ldap/v3"
	"golang.org/x/term"
)

var Username, Password string

func ConnectToServer(URL string) (l *ldap.Conn, err error) {

	// Connect to Server
	l, err = ldap.DialURL(URL)
	if err != nil {
		log.Fatal(err)
	}

	// Bind to the server (Allows for searching)
	err = l.Bind(fmt.Sprintf("URMC-sh\\%s", Username), Password)

	return

}

// Prompts for username and password
func Login() {

	for invalidCredential := true; invalidCredential; {

		fmt.Println("Enter AD Username: ")
		fmt.Scan(&Username)

		fmt.Println("Enter Password: ")
		temp, _ := term.ReadPassword(int(os.Stdin.Fd()))
		Password = string(temp[:])

		l, err := ConnectToServer("LDAP://urmc-sh.rochester.edu/")

		if err != nil {
			fmt.Println("Invaid Username or Password")
			time.Sleep(1 * time.Second)
			utils.ClearTerm()
			continue
		}

		if Username == "" || Password == "" {
			log.Fatal("Server will not start with out credentials")
		}

		invalidCredential = false
		l.Unbind()
		l.Close()

	}
	utils.ClearTerm()
}
