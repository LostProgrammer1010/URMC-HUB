package server

import (
	"backend/internal/routes"
	"fmt"
	"net/http"
)

func Start() {
	//Must Login before starting the server
	router := routes.NewRouter()

	port := 8080
	address := fmt.Sprintf("127.0.0.1:%d", port)

	// Start a server on port 8080 (127.0.0.1 only allows connection from current device)
	fmt.Println("Server is running on port 8080...")
	err := http.ListenAndServe(address, router)

	if err != nil {
		panic(err)
	}
}
