package get

import (
	"backend/internal/AD"
	"backend/internal/api/option"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func ComputersSearch(w http.ResponseWriter, r *http.Request) {

	option.EnableCORS(w, r)

	if !checkMethod(r) {
		return
	}

	search := strings.Split(r.URL.Path, "/")[3]

	fmt.Println(strings.Split(r.URL.Path, "/"))

	// Log the received message
	fmt.Printf("Searching for:  %s\n", search)

	if search == "" {
		return
	}

	matches := AD.ComputersSearch(search)
	// Set the response header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK) // Send 200 OK status

	jsonData, _ := json.Marshal(matches)

	// Write the response to the client
	w.Write(jsonData)

}
