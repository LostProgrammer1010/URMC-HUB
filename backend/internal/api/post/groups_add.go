package post

import (
	"backend/internal/AD"
	"backend/internal/api/errorHandler"
	"backend/internal/api/option"
	"encoding/json"
	"fmt"
	"net/http"
)

func GroupsAdd(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.URL.Path)

	var input GroupInput

	option.EnableCORS(w, r)

	if !checkMethod(r) {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "Group ADD",
				Request: "POST",
				Message: "Invalid Request Method",
				Code:    400,
				Input:   r.Method,
			})
		return
	}

	err := json.NewDecoder(r.Body).Decode(&input)

	if err != nil {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "ADD Group",
				Request: "POST",
				Message: "Invalid Body",
				Code:    400,
				Input:   fmt.Sprintf("%v, %v", input.Groups, input.Users),
			})
		return
	}

	if len(input.Users) == 0 || len(input.Groups) == 0 {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "ADD Group",
				Request: "POST",
				Message: "User or Groups where empty",
				Code:    400,
				Input:   fmt.Sprintf("%v, %v", input.Groups, input.Users),
			})
		return
	}

	response, err := AD.GroupsAdd(input.Users, input.Groups)

	if err != nil {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "ADD Group",
				Request: "POST",
				Message: "Server Failure Adding Groups",
				Code:    500,
				Input:   fmt.Sprintf("%v, %v", input.Groups, input.Users),
			})
		return
	}

	jsonData, err := json.Marshal(response)

	if err != nil {
		errorHandler.CreateErrorResponse(
			w,
			errorHandler.ErrorResponse{
				Type:    "ADD Group",
				Request: "POST",
				Message: "Sever Failure Parsing JSON",
				Code:    500,
				Input:   fmt.Sprintf("%v, %v", input.Groups, input.Users),
			})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}
