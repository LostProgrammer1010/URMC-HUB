package get

import (
	"backend/internal/AD"
	"backend/internal/api/option"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strings"
)

func ComputersSearch(w http.ResponseWriter, r *http.Request) {

	option.EnableCORS(w, r)

	if !checkMethod(r) {
		return
	}

	fmt.Println(r.URL.Path)
	search := strings.Split(r.URL.Path, "/")[4]
	search, _ = url.QueryUnescape(search)

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
