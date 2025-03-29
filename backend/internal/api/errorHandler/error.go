package errorHandler

import (
	"encoding/json"
	"net/http"
)

type ErrorResponse struct {
	Type    string `json:"type"`
	Request string `json:"request"`
	Message string `json:"message"`
	Code    int    `json:"code"`
	Input   string `json:"input"`
}

func CreateErrorResponse(w http.ResponseWriter, error ErrorResponse) *ErrorResponse {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(error.Code)
	json.NewEncoder(w).Encode(error)
	return &error
}
