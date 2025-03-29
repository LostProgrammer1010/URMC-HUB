package get

import (
	"backend/internal/AD"
	"backend/internal/api/errorHandler"
	"backend/internal/api/option"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strings"
)

// Gets Request to Server to return the groups matching the request
func GroupsSearch(w http.ResponseWriter, r *http.Request) {

	option.EnableCORS(w, r)

	if !checkMethod(r) {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "Group Search",
				Request: "GET",
				Message: "Invalid Request Method",
				Code:    400,
				Input:   r.Method,
			})
		return
	}

	search := strings.Split(r.URL.Path, "/")[4]
	search, err := url.QueryUnescape(search)

	if err != nil || search == "" {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "Group",
				Request: "GET",
				Message: "Invalid Search String",
				Code:    400,
				Input:   search,
			})
		return
	}

	fmt.Println(r.URL.Path)
	fmt.Printf("Searching for:  %s\n", search)

	matches, err := AD.GroupsSearch(search)

	if err != nil {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "Group",
				Request: "GET",
				Message: "Sever Failure While Searching",
				Code:    500,
				Input:   search,
			})
		return
	}

	jsonData, err := json.Marshal(matches)

	if err != nil {
		errorHandler.CreateErrorResponse(
			w, errorHandler.ErrorResponse{
				Type:    "Group",
				Request: "GET",
				Message: "Server Failed Parsing JSON",
				Code:    500,
				Input:   search,
			})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)

}
