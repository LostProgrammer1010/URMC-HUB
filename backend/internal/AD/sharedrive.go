package AD

import (
	"fmt"
	"io"
	"os"
	"strings"
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

func FindShareDrive(input string) (shareDrives []ShareDrive) {
	shareDrives = make([]ShareDrive, 0)
	input = strings.ToLower(input)
	networkPath := "\\\\AD22PDC01\\netlogon\\SIG\\logon.dmd" // Computer: AD22PDC01 FilePath: netlogon\\SIG\\logon.dmd

	file, err := os.Open(networkPath)

	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	data, _ := io.ReadAll(file)

	splitData := strings.Split(string(data), "\n")
	splitData = splitData[:len(splitData)-1] // Removes last element which is blank space

	all := make(map[string][]string)

	for _, line := range splitData {
		parse := strings.Split(line, "|")
		group, drives := strings.ToLower(parse[0]), strings.Split(parse[1], ",")

		for _, drive := range drives {
			currentDrive := strings.ToLower(drive[1:])
			if strings.Contains(currentDrive, input) || strings.Contains(group, input) {
				all[currentDrive] = append(all[currentDrive], group[8:])

			}
		}

	}
	var localPath string
	networkPath = "\\\\AD22PDC01\\netlogon\\SIG\\shares.dmd"
	file, err = os.Open(networkPath)
	if err != nil {
		fmt.Println(err)
	}
	shares, _ := io.ReadAll(file)
	sharesSplit := strings.Split(string(shares), "\n")
	sharesSplit = sharesSplit[:len(sharesSplit)-1]
	for key, value := range all {
		for _, line1 := range sharesSplit {
			parse := strings.Split(line1, "|")
			if strings.Contains(strings.ToLower(parse[0]), strings.TrimSpace(key[2:])) {
				localPath = parse[1]
				break
			}
		}
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