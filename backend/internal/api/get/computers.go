package get

import (
	"backend/internal/AD"
	"backend/internal/api/option"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func ComputersSearch(w http.ResponseWriter, r *http.Request) {

	option.EnableCORS(w, r)

	if !checkMethod(r) {
		http.Error(w, "Incorrect Method", http.StatusBadRequest)
		return
	}

	fmt.Printf("%s\n", r.URL)

	search := strings.Split(r.URL.Path, "/")[4]

	if search == "" {
		http.Error(w, "No search value provided", http.StatusBadRequest)
		return
	}

	fmt.Printf("Computer Search \nValue: %s\n", search)

	matches, err := AD.ComputersSearch(search)

	if err != nil {
		http.Error(w, fmt.Sprintf("Error on LDAP Search\nError:\n%s", err), http.StatusBadRequest)
		return
	}

	jsonData, err := json.Marshal(matches)

	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to parse json for frontend\nError:\n%s", err), http.StatusBadRequest)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	w.Write(jsonData)

}
