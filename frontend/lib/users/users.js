
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

async function lookUpUsers(input) {

  document.getElementById("users").innerHTML = ""
  console.log(input)

  const response = fetch(`http://localhost:8080/users/search/${input}`)
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


}



function pullUpUser(row) {
  const username = row.children[1].innerHTML
  console.log(username)
}