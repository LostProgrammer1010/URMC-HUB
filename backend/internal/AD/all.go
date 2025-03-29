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

func AllSearch(search string, domain string) (result AllResult, err error) {
	result.Users = make([]User, 0)
	result.Computers = make([]Computer, 0)
	result.Groups = make([]Group, 0)
	result.Printers = make([]Printer, 0)
	result.Shares = make([]ShareDrive, 0)
	var wg sync.WaitGroup
	ch := make(chan any, 5)

	wg.Add(5)
	go thread(&wg, ch, func() any {
		result, err := ComputersSearch(search)
		if err != nil {
			return make([]Computer, 0)
		}
		return result
	})
	go thread(&wg, ch, func() any {
		result, err := UsersSearch(search, domain)
		if err != nil {
			return make([]User, 0)
		}
		return result
	})
	go thread(&wg, ch, func() any {
		result, err := GroupsSearch(search)
		if err != nil {
			return make([]Group, 0)
		}
		return result
	})
	go thread(&wg, ch, func() any {
		result, err := MatchPrinter(search)
		if err != nil {
			return make([]Printer, 0)
		}
		return result
	})
	go thread(&wg, ch, func() any {
		result, err := MatchPrinter(search)
		if err != nil {
			return make([]Printer, 0)
		}
		return result
	})

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
			err = fmt.Errorf("Unknown type: %T", results)
		}

	}

	return
}

func thread(wg *sync.WaitGroup, ch chan any, task func() any) {
	defer wg.Done()
	ch <- task()
}
