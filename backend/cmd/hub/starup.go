package main

import (
	"backend/internal/creds"
	"fmt"
	"os"
	"path/filepath"

	"backend/internal/server"

	"github.com/getlantern/systray"
	"github.com/go-ole/go-ole"
	shortcut "github.com/nyaosorg/go-windows-shortcut"
)

var lockFile *os.File
var lockFilePath string

func AddToStartup() {

	ole.CoInitialize(0)
	defer ole.CoUninitialize()

	startupLocation := fmt.Sprintf("C:/Users/%s/AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup/hub.lnk", creds.Username)
	binaryFile := "//ntsdrive05/ISD_share/Cust_Serv/Help Desk Info/Help Desk PC Setup Docs/Home Grown Tools/URMC-HUB/hub.exe"

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

	icon, _ := os.ReadFile("//ntsdrive05/ISD_share/Cust_Serv/Help Desk Info/Help Desk PC Setup Docs/Home Grown Tools/URMC-HUB/URMC.ico")
	systray.SetIcon(icon)
	systray.SetTitle("URMC-HUB Server")
	systray.SetTooltip("Options")
	quitMenuItem := systray.AddMenuItem("Quit", "Exit the application")

	go func() {
		<-quitMenuItem.ClickedCh
		if lockFile != nil {
			lockFile.Close()
			os.Remove(lockFilePath)
		}
		systray.Quit()
		server.Server.Close()

	}()
}

func checkRunning() bool {
	lockFilePath = filepath.Join(os.TempDir(), "urmc-hub.lock")

	var err error
	lockFile, err = os.OpenFile(lockFilePath, os.O_CREATE|os.O_EXCL|os.O_RDWR, 0666)
	if err != nil {
		return true // Another instance is running
	}

	return false
}
