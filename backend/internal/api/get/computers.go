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

	search, err := url.QueryUnescape(search)

	if err != nil || search == "" {
		http.Error(w, "Invalid Search String", http.StatusBadRequest)
		return
	}

	fmt.Println(strings.Split(r.URL.Path, "/"))

	// Log the received message
	fmt.Printf("Searching for:  %s\n", search)

	matches, err := AD.ComputersSearch(search)

	if err != nil {
		http.Error(w, "Error searching for computers", http.StatusInternalServerError)
		return
	}
	// Set the response header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK) // Send 200 OK status

	jsonData, err := json.Marshal(matches)

	if err != nil {
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
		return
	}

	// Write the response to the client
	w.Write(jsonData)

}
