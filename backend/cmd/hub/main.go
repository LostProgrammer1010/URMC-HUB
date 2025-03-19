package main

import (
	"backend/internal/AD"
	"backend/internal/server"
	"os"

	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()

	if err != nil {
		AD.Login()
		server.Start()
	}

	AD.Username = os.Getenv("username")
	AD.Password = os.Getenv("password")

	server.Start()



	//AddToStartup() //once application is finished this can be turn on to put application in startup folder


}
