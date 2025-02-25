package utils

import (
	"os"
	"os/exec"
)

func ClearTerm() {
	cmd := exec.Command("cmd", "/c", "cls")
	cmd.Stdout = os.Stdout
	cmd.Run()
}
