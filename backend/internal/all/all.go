package all

import "backend/internal/AD"

type AllResult struct {
	Users     []AD.User       `json:"users"`
	Computers []AD.Computer   `json:"computers"`
	Groups    []AD.Group      `json:"groups"`
	Printers  []AD.Printer    `json:"printers"`
	Shares    []AD.ShareDrive `json:"shares"`
}

func AllSearch(search string, domain string) (result AllResult) {

	result.Users = AD.UsersSearch(search, domain)

	result.Computers = AD.ComputersSearch(search)

	result.Groups = AD.GroupsSearch(search)

	result.Printers = AD.MatchPrinter(search)

	result.Shares = AD.FindShareDrive(search)

	return
}
