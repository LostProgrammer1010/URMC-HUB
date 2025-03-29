package post

import (
	"backend/internal/AD"
	"backend/internal/api/option"
	"encoding/json"
	"fmt"
	"net/http"
)

// Request to return all printers that match the search
func PrinterSearch(w http.ResponseWriter, r *http.Request) {
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
		return
	}

	printers, err := AD.MatchPrinter(input.Value)

	if err != nil {
		http.Error(w, "Failed to parse JSON", http.StatusInternalServerError)
		return
	}

	fmt.Printf("Number of Printers Found: %d", len(printers))

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	jsonData, err := json.MarshalIndent(printers, "", "  ")

	if err != nil {
		http.Error(w, "Failed to parse JSON", http.StatusInternalServerError)
		return
	}

	w.Write(jsonData)

}
