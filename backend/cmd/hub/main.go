package main

import (
	"backend/internal/AD"
	"backend/internal/server"
)

func main() {

	/*Tester can setup .env in cmd/hub with username name and password to bypass login

	err := godotenv.Load()

	fmt.Println(err)

	//AD.Username = os.Getenv("username")
	//AD.Password = os.Getenv("password")

	*/

	AD.Login()
	//AddToStartup()
	server.Start()

}
