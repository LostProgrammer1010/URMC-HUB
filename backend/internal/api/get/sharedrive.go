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

func GetShareDriveInfo(w http.ResponseWriter, r *http.Request) {
	option.EnableCORS(w, r)

	if !checkMethod(r) {
		return
	}

	share := strings.Split(r.URL.Path, "/")[2]

	share, _ = url.QueryUnescape(share)

	fmt.Println(r.URL.Path)

	// Log the received message
	fmt.Printf("Getting Info for:  %s\n", share)

	if share == "" {
		return
	}

	matches := AD.FindShareDriveInfo(share)

	// Set the response header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK) // Send 200 OK status

	jsonData, _ := json.Marshal(matches)

	// Write the response to the client
	w.Write(jsonData)
}
