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

	share, err := url.QueryUnescape(share)

	if err != nil || share == "" {
		http.Error(w, "Invalid search string", http.StatusBadRequest)
		return

	}

	// Log the received message
	fmt.Println(r.URL.Path)
	fmt.Printf("Getting Info for:  %s\n", share)

	matches, err := AD.FindShareDriveInfo(share)

	if err != nil {
		http.Error(w, "Error Pulling Share Drive Information", http.StatusInternalServerError)
		return
	}

	// Set the response header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK) // Send 200 OK status

	jsonData, err := json.Marshal(matches)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Error encoding JSON"))
		return
	}

	// Write the response to the client
	w.Write(jsonData)
}
