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
	/*Tester can setup .env in cmd/hub with username name and password to bypass login*/

	err := godotenv.Load()

	fmt.Println(err)

	AD.Username = os.Getenv("username")
	AD.Password = os.Getenv("password")

	//AD.Login()
	//AddToStartup() //once application is finished this can be turn on to put application in startup folder
=======
	// Route Handling
	AD.Login()
	AddToStartup()
>>>>>>> c6133bd (Fixing structure due to import cycling)
	server.Start()

}
