package routes

import (
	"backend/internal/api"
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

	mux.HandleFunc("/search/all/", api.AllSearch)
	mux.HandleFunc("/search/groups/", get.GroupsSearch)
	mux.HandleFunc("/search/users/", get.UsersSearch)
	mux.HandleFunc("/user/group/remove/", post.GroupsRemove)
	mux.HandleFunc("/user/group/add/", post.GroupsAdd)
	mux.HandleFunc("/user/", get.UserInfo)
	mux.HandleFunc("/search/computers/", get.ComputersSearch)
	mux.HandleFunc("/search/sharedrives/", post.ShareDriveSearch)
	mux.HandleFunc("/search/printers/", post.PrinterSearch)
	// computer tools
	mux.HandleFunc("/restart/", post.Restart)
	mux.HandleFunc("/ping/", post.Ping)

	return mux
}
