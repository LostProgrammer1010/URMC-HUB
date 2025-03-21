package main

import (
	"backend/internal/creds"
	"fmt"
	"os"
  
	"backend/internal/AD"
	"backend/internal/server"

	"github.com/getlantern/systray"
	"github.com/go-ole/go-ole"
	shortcut "github.com/nyaosorg/go-windows-shortcut"
)

func AddToStartup() {

	ole.CoInitialize(0)
	defer ole.CoUninitialize()

	startupLocation := fmt.Sprintf("C:/Users/%s/AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup/Server.lnk", creds.Username)
	binaryFile := fmt.Sprintf("C:/Users/%s/Documents/Go/URMC-HUB/backend/bin/hub.exe", creds.Username)

	_, e := os.Stat(startupLocation)

	if !os.IsNotExist(e) {
		fmt.Println("File already in startup")
		return
	}

	// Create the shortcut at the startup location on computer
	shortcut.Make(binaryFile, startupLocation, "")
	shortcut.Read(fmt.Sprintf(startupLocation, creds.Username))

}

func onExit() {
	fmt.Println("Exiting application...")
}

func setupTrayIcon() {

	icon, _ := os.ReadFile("URMC.ico")
	systray.SetIcon(icon)
	systray.SetTitle("URMC-HUB Server")
	systray.SetTooltip("Options")
	quitMenuItem := systray.AddMenuItem("Quit", "Exit the application")

	go func() {
		<-quitMenuItem.ClickedCh
		systray.Quit()
		server.Server.Close()
	}()
}
