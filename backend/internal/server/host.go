package server

import (
	"backend/internal/routes"
	"fmt"
	"net/http"
)

var Server *http.Server

func Start() {

	//Must Login before starting the server
	router := routes.NewRouter()

	port := 8080
	//address := fmt.Sprintf(":%d", port)
	address := fmt.Sprintf("127.0.0.1:%d", port)

	// Start a server on port 8080 (127.0.0.1 only allows connection from current device)
	Server = &http.Server{Addr: address, Handler: router}
	go Server.ListenAndServe()
}
