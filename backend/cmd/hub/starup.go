package main

import (
	"fmt"
	"os"

	"backend/internal/AD"

	"github.com/go-ole/go-ole"
	shortcut "github.com/nyaosorg/go-windows-shortcut"
)

func AddToStartup() {

	ole.CoInitialize(0)
	defer ole.CoUninitialize()

	startupLocation := fmt.Sprintf("C:/Users/%s/AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup/Server.lnk", AD.Username)
<<<<<<< HEAD
<<<<<<< HEAD
	binaryFile := fmt.Sprintf("C:/Users/%s/Documents/Go/Service Desk HUB/backend/bin/hub.exe", AD.Username)
=======
	binaryFile := fmt.Sprintf("C:/users/%s/Documents/Go/Megatool/backend/bin/megatool.exe", AD.Username)
>>>>>>> c6133bd (Fixing structure due to import cycling)
=======
	binaryFile := fmt.Sprintf("C:/Users/%s/Documents/Go/Service Desk HUB/backend/bin/hub.exe", AD.Username)
>>>>>>> 8a9ac83 (Updates to sharedrive search)

	_, e := os.Stat(startupLocation)

	if !os.IsNotExist(e) {
		fmt.Println("File already in startup")
		return
	}

	// Create the shortcut at the startup location on computer
	shortcut.Make(binaryFile, startupLocation, "")
	shortcut.Read(fmt.Sprintf(startupLocation, AD.Username))

}
