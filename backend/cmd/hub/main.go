package main

import (
	"backend/internal/AD"
	"backend/internal/server"
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()

	fmt.Println(err)

	AD.Username = os.Getenv("username")
	AD.Password = os.Getenv("password")

	//AD.Login()
	//AddToStartup() //once application is finished this can be turn on to put application in startup folder
	server.Start()

}
