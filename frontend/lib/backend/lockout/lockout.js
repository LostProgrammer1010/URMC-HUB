
function getLockoutInfo() {
    const username = localStorage.getItem("username")

    if (username == null) {
        alert("Page error: You need to search for a user first, re-directing to user search")
        window.location.href = window.location.href.replace("user.html", "searchusers.html")
    }

    const response = fetch(`http://localhost:8080/lockout/${username}`)
    .then(response => response.json()) // Parse the JSON response from the server
    .then(data => {
      pagingdata = data
      currentPage = 1
   
      // display lockout results
      var element = document.getElementById("lockoutResults")
      element.innerHTML = ""
      console.log(data)
      console.log(data[0].servers[0].name.length)
      // Need to implement padding for heading section (may be fixed with user page)
      element.innerHTML += "Name" + " | " + "Count" + " | " + "Time" + "<br>"
      for (let index = 0; index < data[0].servers.length; index++) {
        element.innerHTML += data[0].servers[index].name
        element.innerHTML += " | "
        element.innerHTML += data[0].servers[index].count
        element.innerHTML += " | "
        element.innerHTML += data[0].servers[index].time
        element.innerHTML += "<br>"
      }

    })
    .catch(error=> {
      document.getElementById("loading").style.display = "none"
      alert("Server not running. Please start server located here: File_path")
      alert(error)
      throw new Error("Server not running")
    })
}