package AD

import (
	"fmt"
	"sync"
)

type AllResult struct {
	Users     []User       `json:"users"`
	Computers []Computer   `json:"computers"`
	Groups    []Group      `json:"groups"`
	Printers  []Printer    `json:"printers"`
	Shares    []ShareDrive `json:"shares"`
}

func AllSearch(search string, domain string) (result AllResult) {
	result.Users = make([]User, 0)
	result.Computers = make([]Computer, 0)
	result.Groups = make([]Group, 0)
	result.Printers = make([]Printer, 0)
	result.Shares = make([]ShareDrive, 0)
	var wg sync.WaitGroup
	ch := make(chan any, 5)

	wg.Add(5)
	go thread(&wg, ch, func() any { return ComputersSearch(search) })
	go thread(&wg, ch, func() any { return UsersSearch(search, domain) })
	go thread(&wg, ch, func() any { return GroupsSearch(search) })
	go thread(&wg, ch, func() any { return MatchPrinter(search) })
	go thread(&wg, ch, func() any { return FindShareDrive(search) })

	wg.Wait()
	close(ch)

	for results := range ch {
		switch results := results.(type) {
		case []ShareDrive:
			result.Shares = results
		case []Computer:
			result.Computers = results
		case []User:
			result.Users = results
		case []Group:
			result.Groups = results
		case []Printer:
			result.Printers = results
		default:
			fmt.Println(results)
		}

	}

	return
}

func thread(wg *sync.WaitGroup, ch chan any, task func() any) {
	defer wg.Done()
	ch <- task()
}
