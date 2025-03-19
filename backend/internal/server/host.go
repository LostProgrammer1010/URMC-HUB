package server

import (
	"backend/internal/routes"
	"backend/internal/AD"
	"fmt"
	"net/http"
)

func Start() {
	//Must Login before starting the server
	router := routes.NewRouter()

	port := 8080
	//address := fmt.Sprintf(":%d", port)
	address := fmt.Sprintf("127.0.0.1:%d", port)

	// Start a server on port 8080 (127.0.0.1 only allows connection from current device)
	fmt.Printf(
`
Contact Dustin or Joseph if any bug are encounter

Succussfully logged in as %s
Please Navigate to URMC-HUB in Browser
Server is running ... 
`, AD.Username)
	err := http.ListenAndServe(address, router)

	if err != nil {
		panic("Server Failed to Start")
	}
}
