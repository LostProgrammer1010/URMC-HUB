package get

import (
	"backend/internal/AD"
	"backend/internal/api/option"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func UsersSearch(w http.ResponseWriter, r *http.Request) {
	option.EnableCORS(w, r)
	if !checkMethod(r) {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	search := strings.Split(r.URL.Path, "/")[3]

	if search == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Prints the path and search input for logs
	fmt.Println(strings.Split(r.URL.Path, "/"))
	fmt.Printf("Searching for:  %s\n", search)

	matches := AD.UsersSearch(search)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	jsonData, _ := json.Marshal(matches)
	w.Write(jsonData)

}
