package main

import (
	"backend/internal/creds"
	"backend/internal/server"
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()

	fmt.Println(err)

	creds.Username = os.Getenv("username")
	creds.Password = os.Getenv("password")







	//AD.GroupsSearch("ISDG_CTX_eRecord2")


	//AD.Login()
	//AddToStartup() //once application is finished this can be turn on to put application in startup folder
	server.Start()

}
