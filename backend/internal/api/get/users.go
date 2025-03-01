package get

import (
	"backend/internal/AD"
	"backend/internal/api/option"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"
)

func UsersSearch(w http.ResponseWriter, r *http.Request) {

	option.EnableCORS(w, r)

	if !checkMethod(r) {
		return
	}

	time.Sleep(1 * time.Second)

	search := strings.Split(r.URL.Path, "/")[3]

	fmt.Println(strings.Split(r.URL.Path, "/"))

	// Log the received message
	fmt.Printf("Searching for:  %s\n", search)

	if search == "" {
		return
	}

<<<<<<< HEAD
<<<<<<< HEAD
	matches := AD.UsersSearch(search)
=======
	matches := AD.SearchUsers(search)
>>>>>>> d1f630e (Re-structure of files due to import cycling)
=======
	matches := AD.UsersSearch(search)
>>>>>>> 57c1f17 (Printer Queue and Groups backend)

	// Set the response header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK) // Send 200 OK status

	jsonData, _ := json.Marshal(matches)

	// Write the response to the client
	w.Write(jsonData)

}
