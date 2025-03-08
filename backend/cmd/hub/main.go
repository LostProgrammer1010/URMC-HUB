package main

import (
	"backend/internal/AD"
	"backend/internal/server"
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()

	fmt.Println(err)

	AD.Username = os.Getenv("username")
	AD.Password = os.Getenv("password")

	AD.UsersSearch("mwils67_STU")

	//AD.Login()
	//AddToStartup() //once application is finished this can be turn on to put application in startup folder
	server.Start()

	//post.FindShareDrive("NTSDRIVE05")

}

/*
func makereq() {

	// Define your username and password
	username := "dmeyer20"
	password := "PoleVault10"

	// Combine username and password and encode them in Base64
	auth := username + ":" + password
	encodedAuth := base64.StdEncoding.EncodeToString([]byte(auth))

	// Define the URL
	url := "https://myidentity.rochester.edu/identity/admin/"

	// Create a new HTTP request with the GET method
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}

	// Set the Authorization header with the encoded credentials
	req.Header.Set("Authorization", "Basic "+encodedAuth)

	// Create an HTTP client and execute the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}
	defer resp.Body.Close()

	// Read and print the response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		return
	}

	// Print the response status and body
	fmt.Println("Response Status:", resp.Status)
	fmt.Println("Response Body:", string(body))
}
*/
