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

func GetShareDriveInfo(w http.ResponseWriter, r *http.Request) {
	option.EnableCORS(w, r)

	if !checkMethod(r) {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "Share Drive Info",
				Request: "GET",
				Message: "Invalid Request Method",
				Code:    400,
				Input:   r.Method,
			})
		return
	}

	share := strings.Split(r.URL.Path, "/")[2]

	share, err := url.QueryUnescape(share)

	if err != nil || share == "" {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "Share Drive",
				Request: "GET",
				Message: "Invalid Share Drive",
				Code:    400,
				Input:   share,
			})
		return

	}

	fmt.Println(r.URL.Path)
	fmt.Printf("Getting Info for:  %s\n", share)

	matches, err := AD.FindShareDriveInfo(share)

	if err != nil {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "Share Drive",
				Request: "GET",
				Message: "Server Failure Getting Information",
				Code:    500,
				Input:   share,
			})
		return
	}

	jsonData, err := json.Marshal(matches)

	if err != nil {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "Share Drive",
				Request: "GET",
				Message: "Server Failed Parsing JSON",
				Code:    500,
				Input:   share,
			})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}
