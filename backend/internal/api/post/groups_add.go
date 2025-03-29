package post

import (
	"backend/internal/AD"
	"backend/internal/api/option"
	"encoding/json"
	"fmt"
	"net/http"
)

func GroupsAdd(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.URL.Path)

	var input GroupInput

	option.EnableCORS(w, r)

	if !CheckMethod(r) {
		http.Error(w, "Incorrect Method", http.StatusBadRequest)
		return
	}

	err := json.NewDecoder(r.Body).Decode(&input)

	if err != nil {
		http.Error(w, "Failed to parse JSON", http.StatusBadRequest)
		return
	}

	if len(input.Users) == 0 || len(input.Groups) == 0 {
		http.Error(w, "Either Users or Groups where not provided", http.StatusBadRequest)
		return
	}

	response, err := AD.GroupsAdd(input.Users, input.Groups)

	if err != nil {
		http.Error(w, "Failed to add users to groups", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK) // Send 200 OK status

	jsonData, err := json.Marshal(response)

	if err != nil {
		http.Error(w, "Error Converting to JSON", http.StatusInternalServerError)
		return
	}

	w.Write(jsonData)
}
