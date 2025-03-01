package main

import (
	"backend/internal/AD"
	"backend/internal/server"
)

func main() {

	AD.Login()
	AddToStartup()
	server.Start()

}
