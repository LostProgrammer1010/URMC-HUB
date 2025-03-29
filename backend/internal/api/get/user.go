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

func UserInfo(w http.ResponseWriter, r *http.Request) {
	option.EnableCORS(w, r)

	if !checkMethod(r) {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "User Info",
				Request: "GET",
				Message: "Invalid Request Method",
				Code:    400,
				Input:   r.Method,
			})
		return
	}

	username := strings.Split(r.URL.Path, "/")[3]
	domain := strings.Split(r.URL.Path, "/")[2]

	username, err := url.QueryUnescape(username)

	if err != nil || username == "" {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "User",
				Request: "GET",
				Message: "Invalid Search String",
				Code:    400,
				Input:   username,
			})
		return
	}

	fmt.Println(r.URL.Path)
	fmt.Printf("Searching for:  %s\n", username)

	matches, err := AD.UserInfoSearch(username, domain)

	if err != nil {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "User",
				Request: "GET",
				Message: "Server Failure Looking Up Information",
				Code:    500,
				Input:   username,
			})
		return
	}

	jsonData, err := json.Marshal(matches)

	if err != nil {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "User",
				Request: "GET",
				Message: "Server Failed Parsing JSON",
				Code:    400,
				Input:   username,
			})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)

}
