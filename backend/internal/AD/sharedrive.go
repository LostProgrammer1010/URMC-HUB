package AD

import (
	"backend/internal/global"
	"fmt"
	"io"
	"os"
	"sort"
	"strings"
	"sync"
)

type Input struct {
	Value  string `json:"value"`
	Domain string `json:"domain"`
}

type ShareDrive struct {
	Group     []string `json:"groups"`
	Drive     string   `json:"drive"`
	LocalPath string   `json:"localpath"`
	Type      string   `json:"type"`
}

type ShareDrivePage struct {
	Groups     []GroupResult `json:"groups"`
	Sharedrive string        `json:"sharedrive"`
}

func FindShareDrive(input string) (shareDrives []ShareDrive) {
	shareDrives = make([]ShareDrive, 0)
	input = strings.ToLower(input)
	networkPath := global.SHAREDRIVEPATH // Computer: AD22PDC01 FilePath: netlogon\\SIG\\logon.dmd
	file, err := os.Open(networkPath)

	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	data, _ := io.ReadAll(file)
	lines := strings.Split(string(data), "\n")
	lines = lines[:len(lines)-1] // Removes last element which is blank space
	foundDrives := make(map[string][]string)

	for _, line := range lines {
		parse := strings.Split(line, "|")
		group, drives := strings.ToLower(parse[0]), strings.Split(parse[1], ",")
		for _, drive := range drives {
			currentDrive := strings.ToLower(strings.TrimSpace(drive[1:]))
			// Checks to see if the input is container in either the group or share drive
			if strings.Contains(currentDrive, input) || strings.Contains(group, input) {
				foundDrives[currentDrive] = append(foundDrives[currentDrive], group[8:])

			}
		}
	}
	shareDrives = findLocalPath(foundDrives)

	return

}

func findLocalPath(foundDrives map[string][]string) (shareDrives []ShareDrive) {
	shareDrives = make([]ShareDrive, 0)
	var localPath string
	networkPath := "\\\\AD22PDC01\\netlogon\\SIG\\shares.dmd"
	file, err := os.Open(networkPath)

	if err != nil {
		fmt.Println(err)
	}

	data, _ := io.ReadAll(file)
	lines := strings.Split(string(data), "\n")
	lines = lines[:len(lines)-1]

	for key, value := range foundDrives {
		for _, line := range lines {
			parse := strings.Split(line, "|")
			if strings.Contains(strings.ToLower(parse[0]), strings.TrimSpace(key[2:])) {
				localPath = parse[1]
				break
			}
		}
		sort.Strings(value)
		shareDrives = append(shareDrives, ShareDrive{value, key, localPath, "sharedrives"})
	}
	return
}

func CheckGroupForShareDrive(group string) *ShareDrive {
	shareDrive := FindShareDrive(group)

	if len(shareDrive) != 0 {
		return &ShareDrive{shareDrive[0].Group, shareDrive[0].Drive, shareDrive[0].LocalPath, shareDrive[0].Type}
	}

	return nil
}

func FindShareDriveInfo(share string) (shareDrive ShareDrivePage) {
	share = strings.ToLower(share)
	networkPath := "\\\\AD22PDC01\\netlogon\\SIG\\logon.dmd" // Computer: AD22PDC01 FilePath: netlogon\\SIG\\logon.dmd
	file, err := os.Open(networkPath)

	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	data, _ := io.ReadAll(file)
	lines := strings.Split(string(data), "\n")
	lines = lines[:len(lines)-1]

	groupsFound := make([]string, 0)
	l, _ := ConnectToServer("LDAP://urmc-sh.rochester.edu/")
	shareDrive.Sharedrive = share

	var wg sync.WaitGroup

	for _, line := range lines {
		parse := strings.Split(line, "|")
		group, drives := parse[0][8:], strings.Split(parse[1], ",")

		for _, drive := range drives {

			drive = strings.ToLower(strings.TrimSpace(drive))[1:]
			if drive == share {
				fmt.Println(drive)
				wg.Add(1)
				go func() {
					defer wg.Done()
					shareDrive.Groups = append(shareDrive.Groups, GroupInfo(group, l, "urmc-sh"))
					groupsFound = append(groupsFound, group)
				}()
			}
		}

	}
	wg.Wait()

	if len(groupsFound) == 0 {
		return
	}

	return
}
