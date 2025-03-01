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
	binaryFile := fmt.Sprintf("C:/users/%s/Documents/Go/Megatool/backend/bin/megatool.exe", AD.Username)

	_, e := os.Stat(startupLocation)

	if !os.IsNotExist(e) {
		fmt.Println("File already in startup")
		return
	}

	// Create the shortcut at the startup location on computer
	shortcut.Make(binaryFile, startupLocation, "")
	shortcut.Read(fmt.Sprintf(startupLocation, AD.Username))

}
