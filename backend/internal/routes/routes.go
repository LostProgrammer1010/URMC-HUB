package routes

import (
	"backend/internal/api/get"
	"net/http"
)

func NewRouter() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/users/search/", get.UsersSearch)

	return mux
}

/*
// Handler for POST request to receive messages
func handlePost(w http.ResponseWriter, r *http.Request) {

	option.EnableCORS(w, r)

	fmt.Println(r.URL.Path)
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	// Check if the request method is POST
	// Read the body of the request
	var input Input

	fmt.Println(r.Body)
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		http.Error(w, "Failed to parse JSON", http.StatusBadRequest)
		return
	}

	// Log the received message
	fmt.Printf("Searching for:  %s\n", input.Value)

	if input.Value == "" {
		return
	}

	matches := findUser(input.Value)

	// Set the response header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK) // Send 200 OK status

	jsonData, _ := json.Marshal(matches)

	// Write the response to the client
	w.Write(jsonData)
}

func findUser(input string) (matches []string) {

	fmt.Println(input)

	l, err := server.ConnectToServer("LDAP://urmc-sh.rochester.edu/")
	fmt.Println(err)
	defer l.Close()

	searchRequest := ldap.NewSearchRequest(
		"DC=urmc-sh,DC=rochester,DC=edu",
		ldap.ScopeWholeSubtree,
		ldap.NeverDerefAliases,
		0, // Max search size 1500
		0, // No timeout for search
		false,
		fmt.Sprintf("(&(objectClass=user)(|(SAMAccountName=%s*)(givenName=%s*)(sn=%s*)))", input, input, input), //Filter
		[]string{"cn", "distinguishedName", "name", "sAMAccountName"},                                           // Attributes
		nil,
	)

	results, _ := l.Search(searchRequest)

	for _, entry := range results.Entries {

		matches = append(matches, fmt.Sprintf("%s | %s | %s", entry.GetAttributeValue("sAMAccountName"), entry.GetAttributeValue("name"), entry.GetAttributeValue("distinguishedName")))
	}

	err = l.Unbind()
	if err != nil {
		log.Fatal(err)
	}

	return

}

*/
