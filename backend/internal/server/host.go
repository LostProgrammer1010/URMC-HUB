package server

import (
	"backend/internal/routes"
	"fmt"
	"net/http"
<<<<<<< HEAD
<<<<<<< HEAD:backend/internal/server/host.go
=======

	"backend/internal/routes"
	"backend/internal/server"
>>>>>>> 2490d27 (Update to nav bar):backend/cmd/megatool/main.go
)

<<<<<<< HEAD:backend/internal/server/host.go
func Start() {
	//Must Login before starting the server
=======
func main() {

	// Route Handling
<<<<<<< HEAD:backend/internal/server/host.go
	// utils.Login() //Must Login before starting the server
>>>>>>> 3117f38 (Loading animation | New Folder structure | Replace POST request with GET):backend/cmd/megatool/main.go
=======
	server.Login() //Must Login before starting the server
>>>>>>> 2490d27 (Update to nav bar):backend/cmd/megatool/main.go
=======
)

func Start() {
	//Must Login before starting the server
>>>>>>> d1f630e (Re-structure of files due to import cycling)
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
