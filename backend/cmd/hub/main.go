package main

import (
	"backend/internal/AD"
	"backend/internal/global"
	"backend/internal/server"
	"fmt"
	"os"

	"github.com/getlantern/systray"
)

func main() {

	users, _ := AD.UsersSearch("wigginsn", "")

	fmt.Println(users)

	if checkRunning(8080) {
		fmt.Println("Server already running")
		os.Exit(1)
	}

	if !global.LoadCreds() {
		AD.Login()
	}

	global.LoadEnv()

	AddToStartup()
	server.Start()
	systray.Run(setupTrayIcon, onExit)

}
