package get

import (
	"encoding/json"
	"net/http"
	"net/url"
	"strings"

	"github.com/LostProgrammer1010/URMC-HUB/internal/ad"
)

func AllSearch(w http.ResponseWriter, r *http.Request) {

}

func UserSearch(w http.ResponseWriter, r *http.Request) {

	urlParse := strings.Split(r.URL.Path, "/")

	searchValue := urlParse[len(urlParse)-1]

	searchValue, _ = url.QueryUnescape(searchValue)

	userMatches, _ := ad.SearchAllUsers(searchValue)

	jsonData, _ := json.Marshal(userMatches)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}

func GroupSearch(w http.ResponseWriter, r *http.Request) {

}

func ComputerSearch(w http.ResponseWriter, r *http.Request) {

}

func ShareDriveShearch(w http.ResponseWriter, r *http.Request) {

}
