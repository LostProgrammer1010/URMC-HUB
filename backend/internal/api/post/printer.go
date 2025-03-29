package post

import (
	"backend/internal/AD"
	"backend/internal/api/errorHandler"
	"backend/internal/api/option"
	"encoding/json"
	"fmt"
	"net/http"
)

// Request to return all printers that match the search
func PrinterSearch(w http.ResponseWriter, r *http.Request) {
	var input AD.Input
	option.EnableCORS(w, r)

	if !checkMethod(r) {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "Printer Search",
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
				Type:    "Printer Search",
				Request: "POST",
				Message: "Invalid Body",
				Code:    400,
				Input:   input.Value,
			})
		return
	}

	fmt.Println(r.URL.Path)
	fmt.Printf("Searching for:  %s\n", input.Value)

	printers, err := AD.MatchPrinter(input.Value)

	if err != nil {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "Printer Search",
				Request: "POST",
				Message: "Server Failure While Searching",
				Code:    500,
				Input:   input.Value,
			})
		return
	}

	fmt.Printf("Number of Printers Found: %d", len(printers))

	jsonData, err := json.MarshalIndent(printers, "", "  ")

	if err != nil {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "Printer Search",
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
