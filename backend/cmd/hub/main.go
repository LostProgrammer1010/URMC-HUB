package main

import (
	"backend/internal/AD"
	"backend/internal/creds"
	"backend/internal/server"
	"fmt"
	"os"

	"github.com/getlantern/systray"
	"github.com/joho/godotenv"
)

func main() {

	if checkRunning(8080) {
		fmt.Println("Server already running")
		os.Exit(1)
	}

	err := godotenv.Load()

	if err != nil {
		AD.Login()
	} else {
		creds.Username = os.Getenv("username")
		creds.Password = os.Getenv("password")
	}

	AddToStartup()
	server.Start()
	systray.Run(setupTrayIcon, onExit)

}
