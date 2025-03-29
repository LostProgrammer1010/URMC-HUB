package post

import (
	"backend/internal/AD"
	"backend/internal/api/errorHandler"
	"backend/internal/api/option"
	"encoding/json"
	"fmt"
	"net/http"
)

func ShareDriveSearch(w http.ResponseWriter, r *http.Request) {

	var input AD.Input
	option.EnableCORS(w, r)

	if !checkMethod(r) {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "Share Drive Search",
				Request: "POST",
				Message: "Invalid Request Method",
				Code:    400,
				Input:   r.Method,
			})
		return
	}

	err := json.NewDecoder(r.Body).Decode(&input)

	if err != nil || input.Value == "" {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "Share Drive Search",
				Request: "POST",
				Message: "Invalid Body",
				Code:    400,
				Input:   input.Value,
			})
		return
	}

	// Log the received message
	fmt.Println(r.URL.Path)
	fmt.Printf("Searching for:  %s\n", input.Value)

	matches, err := AD.FindShareDrive(input.Value)

	if err != nil || input.Value == "" {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "Share Drive Search",
				Request: "POST",
				Message: "Server Failure While Searching",
				Code:    500,
				Input:   input.Value,
			})
		return
	}

	jsonData, err := json.Marshal(matches)

	if err != nil {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "Restart",
				Request: "POST",
				Message: "Server Failure Parsing JSON",
				Code:    500,
				Input:   input.Value,
			})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}
