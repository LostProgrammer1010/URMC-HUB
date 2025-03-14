package post

import "net/http"

// Check to make sure request is a GET method
func CheckMethod(r *http.Request) bool {

	return r.Method == http.MethodPost

}
