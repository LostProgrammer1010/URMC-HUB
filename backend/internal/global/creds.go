package global

import (
	"os"

	"github.com/joho/godotenv"
)

var (
	Username,
	Password string
)

func LoadCreds() bool {
	err := godotenv.Load()

	if err != nil {
		return false
	}

	Username = os.Getenv("username")
	Password = os.Getenv("password")

	return true
}
