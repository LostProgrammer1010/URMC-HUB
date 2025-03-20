package post

import (
	"backend/internal/AD"
	"backend/internal/api/option"
	"encoding/json"
	"fmt"
	"net/http"
)

func GroupsAdd(w http.ResponseWriter, r *http.Request) {
	var input GroupInput

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

	if input.User == "" {
		fmt.Println("Blank value")
		return
	}

	response := AD.GroupsAdd(input.User, input.Group)	
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK) // Send 200 OK status

	jsonData, _ := json.Marshal(response)

	w.Write(jsonData)
}