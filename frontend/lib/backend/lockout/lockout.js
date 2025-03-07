getLockoutInfo()


function getLockoutInfo() {
    const username = localStorage.getItem("username")

    const loading = document.getElementById("loading")

    loading.style.display = "flex"

    var element = document.getElementById("lockoutResults")

    element.innerHTML = "";

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
      // Need to implement padding for heading section (may be fixed with user page)
      element.innerHTML += "Name" + " | " + "Count" + " | " + "Time" + "<br>"
      for (let index = 0; index < data.length; index++) {
        element.innerHTML += data[index].name
        element.innerHTML += " | "
        element.innerHTML += data[index].count
        element.innerHTML += " | "
        element.innerHTML += data[index].time
        element.innerHTML += "<br>"
      }
      loading.style.display = "none"

    })
    .catch(error=> {
      loading.style.display = "none"
      alert("Server not running. Please start server located here: File_path")
      alert(error)
      throw new Error("Server not running")
    })

}