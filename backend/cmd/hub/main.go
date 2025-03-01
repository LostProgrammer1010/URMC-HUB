package main

import (
	"backend/internal/AD"
	"backend/internal/server"
)

func main() {

	// Route Handling
	AD.Login()
	AddToStartup()
	server.Start()

}
