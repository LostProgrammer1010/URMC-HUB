package option

import (
	"fmt"
	"net/http"
)

/*
Allows for communication from a local file since it does not have an Origin for the request

When OPTION request is send first we send a status ok back to frontend.
Then the frontend will send it POST request back to the server
*/
func EnableCORS(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Method)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

	// If it's a preflight request (OPTIONS), just respond with 200 OK
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}
}
