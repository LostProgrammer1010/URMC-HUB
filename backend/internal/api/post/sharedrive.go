package post

import (
	"backend/internal/AD"
	"backend/internal/api/option"
	"encoding/json"
	"fmt"
	"net/http"
)

func ShareDriveSearch(w http.ResponseWriter, r *http.Request) {

	var input AD.Input
	option.EnableCORS(w, r)

	if !CheckMethod(r) {
		http.Error(w, "Incorrect Method", http.StatusBadRequest)
		return
	}

	fmt.Println(r.URL.Path)

	err := json.NewDecoder(r.Body).Decode(&input)

	if err != nil {
		http.Error(w, "Failed to parse JSON", http.StatusBadRequest)
		return
	}

	// Log the received message
	fmt.Printf("Searching for:  %s\n", input.Value)

	if input.Value == "" {
		http.Error(w, "Invalid search string", http.StatusBadRequest)
		return
	}

	matches, err := AD.FindShareDrive(input.Value)

	if err != nil {
		http.Error(w, "Failed to search for user", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK) // Send 200 OK status

	jsonData, err := json.Marshal(matches)

	if err != nil {
		http.Error(w, "Failed to convert to JSON", http.StatusInternalServerError)
	}

	w.Write(jsonData)
}
