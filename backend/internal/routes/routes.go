package routes

import (
	"backend/internal/api/get"
	"net/http"
)

/*
Routes that will be need

All:
GET all/search/{input}

Users:
GET users/search/{username} - Finds all users that match search
GET user/{username} - pulls all information about a user
POST user/group/add/{username} - adds user to group
POST user/update/{username} - update user information

Groups
GET groups/search/{Group} - Find all Groups that match search
GET group/members/{Group} - pulls all the memebers of the ad group
GET group/{Group} - Pulls information about the AD Group

Computer
GET computers/search/{Group} - Find all computers that match Search

*/

func NewRouter() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/users/search/", get.UsersSearch)

	return mux
}
