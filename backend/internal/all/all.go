package all

import (
	"backend/internal/AD"
	"fmt"
	"sync"
	"time"
)

type AllResult struct {
	Users     []AD.User       `json:"users"`
	Computers []AD.Computer   `json:"computers"`
	Groups    []AD.Group      `json:"groups"`
	Printers  []AD.Printer    `json:"printers"`
	Shares    []AD.ShareDrive `json:"shares"`
}

func AllSearch(search string, domain string) (result AllResult) {

	fmt.Println(time.Now())

	var wg sync.WaitGroup
	ch := make(chan interface{}, 5)

	wg.Add(5)
	go thread(&wg, ch, func() interface{} { return AD.ComputersSearch(search) })
	go thread(&wg, ch, func() interface{} { return AD.UsersSearch(search, domain) })
	go thread(&wg, ch, func() interface{} { return AD.GroupsSearch(search) })
	go thread(&wg, ch, func() interface{} { return AD.MatchPrinter(search) })
	go thread(&wg, ch, func() interface{} { return AD.FindShareDrive(search) })

	wg.Wait()
	close(ch)

	for results := range ch {
		switch results := results.(type) {
		case []AD.ShareDrive:
			result.Shares = results
		case []AD.Computer:
			result.Computers = results
		case []AD.User:
			result.Users = results
		case []AD.Group:
			result.Groups = results
		case []AD.Printer:
			result.Printers = results
		default:
			fmt.Println(results)
		}

	}

	fmt.Println(time.Now())

	return
}

func thread(wg *sync.WaitGroup, ch chan any, task func() any) {
	defer wg.Done()
	ch <- task()
}
