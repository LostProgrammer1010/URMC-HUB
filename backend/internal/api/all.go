package api

import (
	"backend/internal/AD"
	"backend/internal/all"
	"backend/internal/api/option"
	"backend/internal/api/post"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func AllSearch(w http.ResponseWriter, r *http.Request) {
	var input AD.Input

	option.EnableCORS(w, r)

	if !post.CheckMethod(r) {
		return
	}

	err := json.NewDecoder(r.Body).Decode(&input)

	if err != nil {

		http.Error(w, "Failed to parse JSON", http.StatusBadRequest)
		return
	}

	fmt.Println(strings.Split(r.URL.Path, "/"))

	// Log the received message
	fmt.Printf("Searching for:  %s\n", input.Value)

	if input.Value == "" {
		return
	}

	matches := all.AllSearch(input.Value, input.Domain)
	// Set the response header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK) // Send 200 OK status

	jsonData, _ := json.Marshal(matches)

	// Write the response to the client
	w.Write(jsonData)

}
