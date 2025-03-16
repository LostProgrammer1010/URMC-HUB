package post

import (
	"backend/internal/api/option"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
)

type Input struct {
	Value  string `json:"value"`
	Domain string `json:"domain"`
}

type ShareDrive struct {
	Group []string `json:"groups"`
	Drive string   `json:"drive"`
	Type  string   `json:"type"`
}

func ShareDriveSearch(w http.ResponseWriter, r *http.Request) {

	var input Input
	option.EnableCORS(w, r)

	if !CheckMethod(r) {
		http.Error(w, "Incorrect Method", http.StatusBadRequest)
		return
	}

	fmt.Println(r.URL.Path)

	err := json.NewDecoder(r.Body).Decode(&input)

	if err != nil {

		http.Error(w, "Failed to parse JSON", http.StatusBadRequest)
		return
	}

	// Log the received message
	fmt.Printf("Searching for:  %s\n", input.Value)

	if input.Value == "" {
		return
	}

	matches := FindShareDrive(input.Value)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK) // Send 200 OK status

	jsonData, _ := json.Marshal(matches)

	w.Write(jsonData)
}

func FindShareDrive(input string) (shareDrives []ShareDrive) {
	shareDrives = make([]ShareDrive, 0)
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
		group, drives := parse[0], strings.Split(parse[1], ",")

		for _, drive := range drives {
			if strings.Contains(strings.ToLower(drive), strings.ToLower(input)) || strings.Contains(strings.ToLower(group), strings.ToLower(input)) {
				all[drive[1:]] = append(all[drive[1:]], group[8:])
			}

		}

	}

	for key, value := range all {
		shareDrives = append(shareDrives, ShareDrive{value, key, "sharedrives"})
	}

	return

}

func CheckGroupForShareDrive(group string) *ShareDrive {
	shareDrive := FindShareDrive(group)

	if len(shareDrive) != 0 {
		return &ShareDrive{shareDrive[0].Group, shareDrive[0].Drive, shareDrive[0].Type}
	}

	return nil
}
