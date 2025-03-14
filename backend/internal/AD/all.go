package AD

import (
	"backend/internal/api/post"
)

type AllResult struct {
	Users     []User            `json:"users"`
	Computers []Computer        `json:"computers"`
	Groups    []Group           `json:"groups"`
	Printers  []post.Printer    `json:"printers"`
	Shares    []post.ShareDrive `json:"shares"`
}

func AllSearch(search string, domain string) (result AllResult) {

	result.Users = UsersSearch(search, domain)

	result.Computers = ComputersSearch(search)

	result.Groups = GroupsSearch(search)

	result.Printers = post.MatchPrinter(search)

	result.Shares = post.FindShareDrive(search)

	return
}
