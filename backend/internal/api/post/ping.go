package post

import (
	"backend/internal/AD"
	"backend/internal/api/errorHandler"
	"backend/internal/api/option"
	"encoding/json"
	"net/http"
	"os/exec"
)

func Ping(w http.ResponseWriter, r *http.Request) {
	var computerName AD.Input
	option.EnableCORS(w, r)

	if !checkMethod(r) {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "Computer Ping",
				Request: "POST",
				Message: "Invalid Request Method",
				Code:    400,
				Input:   r.Method,
			})
		return
	}

	err := json.NewDecoder(r.Body).Decode(&computerName)

	if err != nil {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "Computer Ping",
				Request: "POST",
				Message: "Invalid Body",
				Code:    400,
				Input:   computerName.Value,
			})
		return
	}

	results, err := pingComputer(computerName.Value)

	if err != nil {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "Computer Ping",
				Request: "POST",
				Message: "Server Failure Pinging Computer",
				Code:    500,
				Input:   computerName.Value,
			})
		return
	}

	jsonData, err := json.Marshal(string(results))

	if err != nil {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "Computer Ping",
				Request: "POST",
				Message: "Server Failure Parsing JSON",
				Code:    500,
				Input:   computerName.Value,
			})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}

func pingComputer(computerName string) (results []byte, err error) {
	cmd := exec.Command("ping", computerName)
	results, err = cmd.CombinedOutput()
	return
}
