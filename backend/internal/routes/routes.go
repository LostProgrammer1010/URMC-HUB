package routes

import (
	"backend/internal/api/get"
	"backend/internal/api/post"
	"net/http"
)

/*
Routes that will be need

All:
GET all/search/{input}

Users:
GET users/search/{input} - Finds all users that match search
GET users/search/UR/{input} - Finds all users that match search with in UR directory
GET user/{input} - pulls all information about a user
POST user/group/add/{input} - adds user to group
POST user/update/{input} - update user information

Groups
GET groups/search/{input} - Find all Groups that match search
GET group/members/{input} - pulls all the memebers of the ad group
GET group/{input} - Pulls information about the AD Group

Computer
GET computers/search/{Group} - Find all computers that match Search

Share Drive
POST /sharedrive/search/
Payload
Input

*/

func NewRouter() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/groups/search/", get.GroupsSearch)
	mux.HandleFunc("/users/search/", get.UsersSearch)
	mux.HandleFunc("/computers/search/", get.ComputersSearch)
	mux.HandleFunc("/sharedrive/search/", post.ShareDriveSearch)
	mux.HandleFunc("/lockout/", get.LockoutInfo)

	return mux
}
