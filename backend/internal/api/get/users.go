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

func UsersSearch(w http.ResponseWriter, r *http.Request) {
	option.EnableCORS(w, r)

	if !checkMethod(r) {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	domain := strings.Split(r.URL.Path, "/")[3]
	search := strings.Split(r.URL.Path, "/")[4]

	search, err := url.QueryUnescape(search)

	if err != nil || search == "" {
		http.Error(w, "Invalid search string", http.StatusBadRequest)
		return
	}

	// Prints the path and search input for logs
	fmt.Println(strings.Split(r.URL.Path, "/"))
	fmt.Printf("Searching for:  %s\n", search)

	matches, err := AD.UsersSearch(search, domain)

	if err != nil {
		http.Error(w, "Error Searching for Users", http.StatusInternalServerError)

		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	jsonData, err := json.Marshal(matches)

	if err != nil {
		http.Error(w, "Error Converting to JSON", http.StatusInternalServerError)
		return
	}

	w.Write(jsonData)

}
