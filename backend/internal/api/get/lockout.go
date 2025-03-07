package get

import (
	"backend/internal/AD"
	"backend/internal/api/option"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/go-ldap/ldap/v3"
)

// creating as objects for easier usage
type AllServerResult struct {
	Servers []ServerResult `json:"servers"`
}

type ServerResult struct {
	Name string `json:"name"`
	Count int `json:"count"`
	Time string `json:"time"`
}

func LockoutInfo(w http.ResponseWriter, r *http.Request) {

	option.EnableCORS(w, r)

	if !checkMethod(r) {
		return
	}

	username := strings.Split(r.URL.Path, "/")[2]

	fmt.Println(strings.Split(r.URL.Path, "/"))

	// Log the received message
	fmt.Printf("Searching for:  %s\n", username)

	if username == "" {
		return
	}

	matches := LockoutInfoData(username)
	// Set the response header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK) // Send 200 OK status

	jsonData, _ := json.Marshal(matches)

	// Write the response to the client
	w.Write(jsonData)

}

func LockoutInfoData(user string) (matches []AllServerResult) {
	fmt.Println(user)
	// maybe implement channels, it's very fast in its current state
	var servers = [...]string{"AD22PDC01", "AD22PDC02", "AD22PDC03", "AD22PDC04", "AD22PDC05", "AD22SDC01", "AD22SDC02", "AD22SDC03", "AD22SDC04", "AD22SDC05"}

	all := new(AllServerResult)

	for _, server := range servers {
		
		l, err := AD.ConnectToServer("LDAP://" + server)
		fmt.Println(err)
		defer l.Close()

		searchRequest := ldap.NewSearchRequest(
			"DC=urmc-sh,DC=rochester,DC=edu",
			ldap.ScopeWholeSubtree,
			ldap.NeverDerefAliases,
			0, // Max search size 1500
			0, // No timeout for search
			false,
			fmt.Sprintf("(&(objectClass=user)(SAMAccountName=%s*))", user), //Filter
			[]string{"badPwdCount", "badPasswordTime"},                                              // Attributes
			nil,
		)

		results, _ := l.Search(searchRequest)

		entry := results.Entries[0]
		fmt.Println(entry.DN)

		countdata := entry.GetAttributeValue("badPwdCount")
		count, _ := strconv.Atoi(countdata)
		time := entry.GetAttributeValue("badPasswordTime")

		all.Servers = append(all.Servers, ServerResult{server, count, time})

		err = l.Unbind()
		if err != nil {
			log.Fatal(err)
		}
	}
	matches = append(matches, *all)
	return
}