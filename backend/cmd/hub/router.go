package main

import (
	"embed"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"path"
)

//go:embed frontend/dist/*
var embeddedFiles embed.FS

//go:embed frontend/dist/index.html
var indexHTML []byte

// Create the routes for the backend
// "/" is special as it will handle all of the react routes
func createRouter() *http.ServeMux {

	mux := http.NewServeMux()
	mux.HandleFunc("/", reactHandler)
	mux.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Hello World")
		w.Write([]byte("Hello World"))
	})

	return mux

}

func reactHandler(w http.ResponseWriter, r *http.Request) {

	// Create a file server from the embedded built react project
	distFS, err := fs.Sub(embeddedFiles, "frontend/dist")

	if err != nil {
		log.Fatal(err)
	}

	// Get the file from the server from the URL
	fileServer := http.FileServer(http.FS(distFS))
	requestPath := path.Clean(r.URL.Path[1:])

	// If the file is not found, serve the index.html
	if requestPath == "/" {
		w.Write(indexHTML)
		return
	}

	// Opens the content of file if found
	file, err := distFS.Open(requestPath)

	// Any errors and it will server the index.html
	if err != nil {
		w.Write(indexHTML)
		return
	}
	file.Close()

	// Serves the file if no issue where found
	fileServer.ServeHTTP(w, r)
}
