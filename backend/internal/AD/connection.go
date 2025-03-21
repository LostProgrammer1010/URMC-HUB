package AD

import (

	"backend/internal/creds"
	"backend/internal/utils"

	"fmt"
	"log"
	"os/exec"
	"strings"

	"github.com/go-ldap/ldap/v3"
)


func ConnectToServer(URL string) (l *ldap.Conn, err error) {

	// Connect to Server
	l, err = ldap.DialURL(URL)
	if err != nil {
		log.Fatal(err)
	}

	// Bind to the server (Allows for searching)
	if URL[7] == 'A' { // checking if domain is an AD server
		err = l.Bind(fmt.Sprintf("urmc-sh\\%s", creds.Username), creds.Password)
		return
	}

	err = l.Bind(fmt.Sprintf("%s\\%s", strings.Split(URL[7:], ".")[0], creds.Username), creds.Password)

	return

}

// Prompts for username and password
func Login() {

	for invalidCredential := true; invalidCredential; {


		output := prompt()

		splitOutput := strings.Split(output, "\n")

		creds.Username = strings.TrimSpace(strings.Split(splitOutput[0], ":")[1])
		creds.Password = strings.TrimSpace(strings.Split(splitOutput[1], ":")[1])

		l, err := ConnectToServer("LDAP://urmc-sh.rochester.edu/")

		if err != nil {
			continue
		}

		if creds.Username == "" || creds.Password == "" {
			log.Fatal("Server will not start with out credentials")
		}

		invalidCredential = false
		l.Unbind()
		l.Close()

	}

}

func prompt() string {
	psScript := `
		Add-Type -AssemblyName System.Windows.Forms
		$credForm = New-Object System.Windows.Forms.Form
		$credForm.Text = "Login Prompt"
		$credForm.Size = New-Object System.Drawing.Size(300,200)

		$labelUser = New-Object System.Windows.Forms.Label
		$labelUser.Text = "Username:"
		$labelUser.Location = New-Object System.Drawing.Point(0,20)
		$credForm.Controls.Add($labelUser)

		$textUser = New-Object System.Windows.Forms.TextBox
		$textUser.Location = New-Object System.Drawing.Point(100,20)
		$credForm.Controls.Add($textUser)

		$labelPass = New-Object System.Windows.Forms.Label
		$labelPass.Text = "Password:"
		$labelPass.Location = New-Object System.Drawing.Point(0,60)
		$credForm.Controls.Add($labelPass)

		$textPass = New-Object System.Windows.Forms.TextBox
		$textPass.Location = New-Object System.Drawing.Point(100,60)
		$textPass.PasswordChar = '*'
		$credForm.Controls.Add($textPass)

		$buttonOk = New-Object System.Windows.Forms.Button
		$buttonOk.Text = "OK"
		$buttonOk.Location = New-Object System.Drawing.Point(60,100)
		$buttonOk.DialogResult = [System.Windows.Forms.DialogResult]::OK
		$credForm.Controls.Add($buttonOk)

		$buttonCancel = New-Object System.Windows.Forms.Button
		$buttonCancel.Text = "Cancel"
		$buttonCancel.Location = New-Object System.Drawing.Point(140,100)
		$buttonCancel.DialogResult = [System.Windows.Forms.DialogResult]::Cancel
		$credForm.Controls.Add($buttonCancel)

		$credForm.AcceptButton = $buttonOk
		$credForm.CancelButton = $buttonCancel

		$result = $credForm.ShowDialog()
		if ($result -eq [System.Windows.Forms.DialogResult]::OK) {
			Write-Output "Username: $($textUser.Text)"
			Write-Output "Password: $($textPass.Text)"
		}
		`

	cmd := exec.Command("powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", psScript)
	output, _ := cmd.CombinedOutput()

	return string(output)
}
