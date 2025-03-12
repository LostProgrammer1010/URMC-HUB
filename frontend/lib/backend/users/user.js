function allowDrop(ev) {
    ev.preventDefault()
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id)
    ev.target.classList.toggle("drag-animation")
}

function dropelement(ev) {
    ev.preventDefault()
    var data = ev.dataTransfer.getData("text")
    ev.target.appendChild(document.getElementById(data))
}

function edit(button) {
    let fields = document.getElementsByClassName("field")

    for (let i = 0; i < fields.length; i++) {
        if (fields[i].getAttribute("contenteditable") == "false") {
            button.innerHTML = "Save"
            fields[i].setAttribute("contenteditable", "true")
        } else {
            button.innerHTML = "Edit"
            fields[i].setAttribute("contenteditable", "false")
        }
        fields[i].classList.toggle("edit")
    }
}

function getUserInfo() {
    const lodaing = document.getElementById("loading")
    if (localStorage.getItem("username") == null) {
      alert("Please search for a user first")
      throw new Error("No username found")
    }
    const response = fetch(
        `http://localhost:8080/user/${localStorage.getItem("username")}`
    )
        .then((response) => response.json()) // Parse the JSON response from the server
        .then((data) => {
            pagingdata = data

            console.log(data)

            var element = document.getElementById("name")
            element.innerHTML = data.name
            var element = document.getElementById("username")
            element.innerHTML = data.username
            var element = document.getElementById("netID")
            element.innerHTML = data.netID
            var element = document.getElementById("urid")
            element.innerHTML = data.URID
            var element = document.getElementById("email")
            element.innerHTML = data.email
            var element = document.getElementById("phone")
            element.innerHTML = data.phone
            var element = document.getElementById("department")
            element.innerHTML = data.department
            var element = document.getElementById("title")
            element.innerHTML = data.title
            var element = document.getElementById("ou")
            element.innerHTML = data.ou
            var element = document.getElementById("location")
            element.innerHTML = data.location
            var element = document.getElementById("lastpasswordset")
            element.innerHTML = data.lastPasswordSet
            var element = document.getElementById("relationship")
            element.innerHTML = data.relationship
            var element = document.getElementById("member-of-results")
            data.groups.forEach((group) => {
                descpad = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description: "
                infopad = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Info: "
                if (group.description == "") descpad = ""
                if (group.info == "") infopad = ""
                element.innerHTML += "\"" + group.name + "\"" + descpad + group.description + infopad + group.info + "<br><br>"
            });

            // display lockout results
            var element = document.getElementById("lockoutResults")
            element.innerHTML = ""
            // Need to implement padding for heading section (may be fixed with user page)
            element.innerHTML +=
                "Name" + " | " + "Count" + " | " + "Time" + "<br>"
            for (let index = 0; index < data.lockoutInfo.length; index++) {
                element.innerHTML += data.lockoutInfo[index].name
                element.innerHTML += " | "
                element.innerHTML += data.lockoutInfo[index].count
                element.innerHTML += " | "
                element.innerHTML += data.lockoutInfo[index].time
                element.innerHTML += "<br>"
            }
            loading.style.display = "none"
        })
        .catch((error) => {
            loading.style.display = "none"
            /*alert(
                "Server not running. Please start server located here: File_path"
            )
                */
            alert(error)
            throw new Error("Server not running")
        })
}

getUserInfo()
