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
	Value string `json:"value"`
}

type ShareDrive struct {
	Group  string `json:"group"`
	Drives []Drive
}

type Drive struct {
	Path string `json:"path"`
}

func ShareDriveSearch(w http.ResponseWriter, r *http.Request) {
	var input Input
	option.EnableCORS(w, r)

	if !checkMethod(r) {
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

	// Set the response header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK) // Send 200 OK status

	jsonData, _ := json.Marshal(matches)

	// Write the response to the client
	w.Write(jsonData)
}

func FindShareDrive(input string) (shareDrives []ShareDrive) {
	networkPath := "\\\\AD22PDC01\\netlogon\\SIG\\logon.dmd" // Computer: AD22PDC01 FilePath: netlogon\\SIG\\logon.dmd

	file, err := os.Open(networkPath)

	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	data, _ := io.ReadAll(file)

	dataArray := strings.Split(string(data), "\n")

	for _, sharedrive := range dataArray {
		if strings.Contains(strings.ToLower(sharedrive), strings.ToLower(input)) {
			parse := strings.Split(sharedrive, "|")
			sharedrive := new(ShareDrive)
			sharedrive.Group = strings.Split(parse[0], "\\")[1]

			paths := strings.Split(parse[1], ",")

			for _, path := range paths {
				sharedrive.Drives = append(sharedrive.Drives, Drive{Path: path[1:]})
			}
			shareDrives = append(shareDrives, *sharedrive)
		}
	}

	return

}
