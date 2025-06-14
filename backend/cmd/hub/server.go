package main

import (
	"fmt"
	"log"
	"net/http"
)

// Creates the router and start local server
func startServer() {

	router := createRouter()

	fmt.Println("Starting server on port 8080")
	log.Fatal(http.ListenAndServe(":8080", router))

}
