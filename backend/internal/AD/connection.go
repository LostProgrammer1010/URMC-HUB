package AD

import (
<<<<<<< HEAD
<<<<<<< HEAD
	"backend/internal/utils"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/go-ldap/ldap/v3"
	"golang.org/x/term"
)

<<<<<<< HEAD
<<<<<<<< HEAD:backend/internal/AD/connection.go
var Username, Password string

=======
=======
	"backend/internal/utils"
>>>>>>> cc2557f (Quick Start added to README)
	"fmt"
	"log"
	"os"
	"time"

	"github.com/go-ldap/ldap/v3"
	"golang.org/x/term"
)

<<<<<<< HEAD
>>>>>>> d1f630e (Re-structure of files due to import cycling)
=======
var Username, password string
=======
var Username, Password string
>>>>>>> 57c1f17 (Printer Queue and Groups backend)

>>>>>>> cc2557f (Quick Start added to README)
func ConnectToServer(URL string) (l *ldap.Conn, err error) {

	// Connect to Server
	l, err = ldap.DialURL(URL)
	if err != nil {
		log.Fatal(err)
	}

	// Bind to the server (Allows for searching)
<<<<<<< HEAD
<<<<<<< HEAD
	err = l.Bind(fmt.Sprintf("URMC-sh\\%s", Username), Password)
=======
	err = l.Bind(fmt.Sprintf("URMC-sh\\%s", Username), password)
>>>>>>> d1f630e (Re-structure of files due to import cycling)
=======
	err = l.Bind(fmt.Sprintf("URMC-sh\\%s", Username), Password)
>>>>>>> 57c1f17 (Printer Queue and Groups backend)

	return

}
<<<<<<< HEAD
<<<<<<< HEAD
========
var Username, password string
>>>>>>>> d1f630e (Re-structure of files due to import cycling):backend/internal/AD/login.go
=======
>>>>>>> cc2557f (Quick Start added to README)

// Prompts for username and password
func Login() {

	for invalidCredential := true; invalidCredential; {

		fmt.Println("Enter AD Username: ")
		fmt.Scan(&Username)

		fmt.Println("Enter Password: ")
		temp, _ := term.ReadPassword(int(os.Stdin.Fd()))
<<<<<<< HEAD
<<<<<<< HEAD
		Password = string(temp[:])
=======
		password = string(temp[:])
>>>>>>> cc2557f (Quick Start added to README)
=======
		Password = string(temp[:])
>>>>>>> 57c1f17 (Printer Queue and Groups backend)

		l, err := ConnectToServer("LDAP://urmc-sh.rochester.edu/")

		if err != nil {
			fmt.Println("Invaid Username or Password")
			time.Sleep(1 * time.Second)
			utils.ClearTerm()
			continue
		}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<<< HEAD:backend/internal/AD/connection.go
		if Username == "" || Password == "" {
========
		if Username == "" || password == "" {
>>>>>>>> d1f630e (Re-structure of files due to import cycling):backend/internal/AD/login.go
=======
		if Username == "" || password == "" {
>>>>>>> cc2557f (Quick Start added to README)
=======
		if Username == "" || Password == "" {
>>>>>>> 57c1f17 (Printer Queue and Groups backend)
			log.Fatal("Server will not start with out credentials")
		}

		invalidCredential = false
		l.Unbind()
		l.Close()

	}
	utils.ClearTerm()
}
<<<<<<< HEAD
=======
>>>>>>> d1f630e (Re-structure of files due to import cycling)
=======
>>>>>>> cc2557f (Quick Start added to README)
