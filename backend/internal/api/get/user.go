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
	fmt.Println(strings.Split(r.URL.Path, "/"))
	username := strings.Split(r.URL.Path, "/")[3]
	fmt.Println(username)
	domain := strings.Split(r.URL.Path, "/")[2]

	username, _ = url.QueryUnescape(username)

	// Log the received message
	fmt.Printf("Searching for:  %s\n", username)

	if username == "" {
		return
	}

	matches := AD.UserInfoSearch(username, domain)
	// Set the response header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK) // Send 200 OK status

	jsonData, _ := json.Marshal(matches)

	// Write the response to the client
	w.Write(jsonData)

}
