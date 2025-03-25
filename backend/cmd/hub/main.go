package main

import (
	"backend/internal/AD"
	"backend/internal/creds"
	"backend/internal/server"
	"os"
	"os/signal"
	"syscall"

	"github.com/getlantern/systray"
	"github.com/joho/godotenv"
)

func main() {

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)

	defer func() {
		if r := recover(); r != nil {
			cleanup()
			panic(r)
		}
	}()

	go func() {
		<-sigChan
		cleanup()
		os.Exit(0)
	}()

	if checkRunning() {
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

func cleanup() {
	if lockFile != nil {
		lockFile.Close()
		os.Remove(lockFilePath)
	}
	systray.Quit()
	server.Server.Close()
}
