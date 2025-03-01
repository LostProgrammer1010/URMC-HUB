const input = document.getElementById('name');

  // Check for when enter key is pressed to submit information
document.getElementById('name').addEventListener('keydown', async function(event) {

    if (event.key == 'Enter') {
        
      try {
        await lookUpUsers(input.value);
      } 
        catch (error) {
          console.error(error)
      }
    }
});

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
  