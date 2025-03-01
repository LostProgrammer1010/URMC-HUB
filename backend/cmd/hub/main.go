package main

import (
	"backend/internal/AD"
	"backend/internal/server"
<<<<<<< HEAD
	"fmt"
	"os"

	"github.com/joho/godotenv"
=======
>>>>>>> c6133bd (Fixing structure due to import cycling)
)

func main() {

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	/*Tester can setup .env in cmd/hub with username name and password to bypass login*/
=======
	/*Tester can setup .env in cmd/hub with username name and password to bypass login
>>>>>>> 57c1f17 (Printer Queue and Groups backend)

	err := godotenv.Load()

	fmt.Println(err)

<<<<<<< HEAD
	AD.Username = os.Getenv("username")
	AD.Password = os.Getenv("password")

	//AD.Login()
	//AddToStartup() //once application is finished this can be turn on to put application in startup folder
=======
	// Route Handling
=======
>>>>>>> cc2557f (Quick Start added to README)
	AD.Login()
	AddToStartup()
>>>>>>> c6133bd (Fixing structure due to import cycling)
=======
	//AD.Username = os.Getenv("username")
	//AD.Password = os.Getenv("password")

	*/

	AD.Login()
	//AddToStartup()
>>>>>>> 57c1f17 (Printer Queue and Groups backend)
	server.Start()

}
