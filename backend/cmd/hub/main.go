package main

import (
	"backend/internal/AD"
	"backend/internal/server"
	"os"

	"github.com/getlantern/systray"
	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()

	if err != nil {
		AD.Login()
	} else {
		AD.Username = os.Getenv("username")
		AD.Password = os.Getenv("password")
	}

	server.Start()
	systray.Run(setupTrayIcon, onExit)

	//AddToStartup() //Once application is finished this can be turn on to put application in startup folder

}
