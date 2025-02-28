
/*
async function lookUpUsers(input) {
  console.log(isProcessing)

  const data =  {
    value: input,
  }
  document.getElementById("users").innerHTML = ""

  const response = fetch('http://localhost:8080/users/find/dmeyer20', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json()) // Parse the JSON response from the server
    .then(data => {
      if (data == null) {
        document.getElementById("users").innerHTML += `
          <tr>
            <td data-label="Name">No Users Found</td>
            <td data-label="Username">No Users Found</td>
            <td data-label="OU">No Users Found</td>
          </tr>
          `
        return
      }  
      for (let i = 0; i < data.length; i++) {

        splitdata = data[i].split("|")

        document.getElementById("users").innerHTML += `
          <tr onclick="pullUpUser(this)">
            <td data-label="Name">${splitdata[1]}</td>
            <td data-label="Username">${splitdata[0]}</td>
            <td data-label="OU">${splitdata[2]}</td>
          </tr>
          `
      }

    })
    .catch(error=> {
      //alert("Server not running. Please start server located here: File_path")
      throw new Error("Server not running")
    })

    isProcessing = false;

}
*/


for (let i=0; i<10; i++){
  document.getElementById("users").innerHTML += `
    <tr onclick="pullUpUser(this)">
      <td data-label="Name">Dustin Meyer</td>
      <td data-label="Username">dmeyer20</td>
      <td data-label="OU">University of Rochester</td>
    </tr>
        `
}

async function lookUpUsers(input) {

  document.getElementById("loading").style.display = "flex"

  document.getElementById("users").innerHTML = ""

  if (input == ""){
    document.getElementById("loading").style.display = "none"
    return
  }

  const response = fetch(`http://localhost:8080/users/search/${input}`)
    .then(response => response.json()) // Parse the JSON response from the server
    .then(data => {
      console.log(data)
      if (data == null) {
        document.getElementById("loading").style.display = "none"
        document.getElementById("users").innerHTML += `
          <tr>
            <td data-label="Name">No Users Found</td>
            <td data-label="Username">No Users Found</td>
            <td data-label="OU">No Users Found</td>
          </tr>
          `
        return
      }  
      document.getElementById("loading").style.display = "none"
      for (let i = 0; i < data.length; i++) {

        splitdata = data[i].split("|")

        document.getElementById("users").innerHTML += `
          <tr onclick="pullUpUser(this)">
            <td data-label="Name">${splitdata[1]}</td>
            <td data-label="Username">${splitdata[0]}</td>
            <td data-label="OU">${splitdata[2]}</td>
          </tr>
          `
      }

    })
    .catch(error=> {
      document.getElementById("loading").style.display = "none"
      alert("Server not running. Please start server located here: File_path")
      throw new Error("Server not running")
    })
}



function pullUpUser(row) {
  const username = row.children[1].innerHTML
  console.log(username)
  localStorage.setItem("username", username)
  window.location.href = "../Pages/userinformation.html"
}