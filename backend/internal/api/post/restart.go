package post

import (
	"backend/internal/AD"
	"backend/internal/api/option"
	"encoding/json"
	"fmt"
	"net/http"
	"os/exec"
)

func Restart(w http.ResponseWriter, r *http.Request) {
	var computerName AD.Input
	option.EnableCORS(w, r)

	if !CheckMethod(r) {
		http.Error(w, "Incorrect Method", http.StatusBadRequest)
		return
	}

	err := json.NewDecoder(r.Body).Decode(&computerName)

	if err != nil {
		http.Error(w, "Failed to parse JSON", http.StatusBadRequest)
		return
	}

	results := string(RestartComputer(computerName.Value))

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	jsonData, _ := json.Marshal(results)

	w.Write(jsonData)
}

func RestartComputer(computerName string) (results []byte) {
	cmd := exec.Command("shutdown", "-r", "-t", "2", "-m", computerName)
	results, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(err)
		return
	}
	return
}
