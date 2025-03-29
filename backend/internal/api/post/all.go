package post

import (
	"backend/internal/AD"
	"backend/internal/api/errorHandler"
	"backend/internal/api/option"
	"encoding/json"
	"fmt"
	"net/http"
)

func AllSearch(w http.ResponseWriter, r *http.Request) {
	var input AD.Input

	option.EnableCORS(w, r)

	if !checkMethod(r) {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "All Search",
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
				Type:    "All Search",
				Request: "POST",
				Message: "Invalid Search Value",
				Code:    400,
				Input:   input.Value,
			})
		return

	}

	fmt.Println(r.URL.Path)
	fmt.Printf("Searching for:  %s\n", input.Value)

	matches, err := AD.AllSearch(input.Value, input.Domain)

	if err != nil {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "All Search",
				Request: "Post",
				Message: "Server Failed while Searching",
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
				Type:    "All Search",
				Request: "POST",
				Message: "Sever Failure Parsing JSON",
				Code:    500,
				Input:   input.Value,
			})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)

}
