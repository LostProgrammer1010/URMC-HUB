package routes

import (
	"backend/internal/api/get"
	"backend/internal/api/post"
	"net/http"
)

func NewRouter() http.Handler {
	mux := http.NewServeMux()

	//Groups Endpoints
	// mux.HandleFunc("/group/", get.GroupInfo)
	// mux.HandleFunc("/group/all/members/", get.GroupAllMembers)

	// Users Endpoints
	mux.HandleFunc("/user/", get.UserInfo)
	mux.HandleFunc("/user/group/remove/", post.GroupsRemove)
	mux.HandleFunc("/user/group/add/", post.GroupsAdd)

	//Search Endpoints
	mux.HandleFunc("/search/all/", post.AllSearch)
	mux.HandleFunc("/search/groups/", get.GroupsSearch)
	mux.HandleFunc("/search/users/", get.UsersSearch)
	mux.HandleFunc("/search/computers/", get.ComputersSearch)
	mux.HandleFunc("/search/sharedrives/", post.ShareDriveSearch)
	mux.HandleFunc("/search/printers/", post.PrinterSearch)

	// Computers Endpoint
	mux.HandleFunc("/restart/", post.Restart)
	mux.HandleFunc("/ping/", post.Ping)

	//ShareDrive
	mux.HandleFunc("/sharedrive/", get.GetShareDriveInfo)

	return mux
}
