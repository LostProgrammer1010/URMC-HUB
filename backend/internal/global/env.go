package global

import (
	"os"

	"github.com/joho/godotenv"
)

var (
	SERVER1, SERVER2, SERVER3, SERVER4, SERVER5, SERVER6, SERVER7, SERVER8, SERVER9, SERVER10, LOGON, SHARES string
)

func LoadEnv() {
	err := godotenv.Load("\\\\ntsdrive05\\ISD_share\\Cust_Serv\\Help Desk Info\\Help Desk PC Setup Docs\\Home Grown Tools\\URMC-HUB\\backend (DO NOT REMOVE)\\.env")

	if err != nil {
		panic("Couldn't find .env file to load variables")
	}

	SERVER1 = os.Getenv("SERVER1")
	SERVER2 = os.Getenv("SERVER2")
	SERVER3 = os.Getenv("SERVER3")
	SERVER4 = os.Getenv("SERVER4")
	SERVER5 = os.Getenv("SERVER5")
	SERVER6 = os.Getenv("SERVER6")
	SERVER7 = os.Getenv("SERVER7")
	SERVER8 = os.Getenv("SERVER8")
	SERVER9 = os.Getenv("SERVER9")
	SERVER10 = os.Getenv("SERVER10")
	LOGON = os.Getenv("LOGON")
	SHARES = os.Getenv("SHARES")

}
