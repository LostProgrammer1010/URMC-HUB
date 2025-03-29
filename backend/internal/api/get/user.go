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

func UserInfo(w http.ResponseWriter, r *http.Request) {
	option.EnableCORS(w, r)

	if !checkMethod(r) {
		return
	}

	username := strings.Split(r.URL.Path, "/")[3]
	domain := strings.Split(r.URL.Path, "/")[2]

	username, err := url.QueryUnescape(username)

	if err != nil || username == "" {
		http.Error(w, "Invalid search string", http.StatusBadRequest)
		return
	}

	// Log the received message
	fmt.Printf("Searching for:  %s\n", username)

	matches, err := AD.UserInfoSearch(username, domain)

	if err != nil {
		http.Error(w, "Error pulling information for user", http.StatusInternalServerError)
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
