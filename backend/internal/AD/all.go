package AD

type AllResult struct {
	Users     []User           `json:"users"`
	Computers []ComputerResult `json:"computers"`
	Groups    []string         `json:"groups"`
}

func AllSearch(search string, domain string) (result AllResult) {

	result.Users = UsersSearch(search, domain)

	result.Computers = ComputersSearch(search)

	result.Groups = GroupsSearch(search)

	return
}