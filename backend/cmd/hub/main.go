package main

import "backend/internal/server"

func main() {

	//err := godotenv.Load()

	//fmt.Println(err)

	//AD.Username = os.Getenv("username")
	//AD.Password = os.Getenv("password")

	//AD.Login()
	//AddToStartup() //once application is finished this can be turn on to put application in startup folder
	server.Start()

	//post.FindShareDrive("NTSDRIVE05")

}
