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

    
    if (sessionStorage.getItem("username") == null) {
        window.location.href = "../pages/search.html"
        return
    }

    const username = sessionStorage.getItem("username")
    localStorage.setItem("username", username)

    fetch(
        `http://localhost:8080/user/${sessionStorage.getItem("domain")}/${localStorage.getItem("username")}`
    )
        .then((response) => response.json()) // Parse the JSON response from the server
        .then((data) => {



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
            data.relationship.forEach((relationship) => {
                element.innerHTML += relationship + "<br>"
            })
            var members = document.getElementById("member-of-results")
            if (data.groups != null )
            {
                data.groups.sort((a, b) => a.name.localeCompare(b.name))
    
                data.groups.forEach((group) => {
                    // group.name group.description group.info
                    groupElement = createGroupElement(group)

                    members.append(groupElement)
                });
            } else {

            }

            // display lockout results
            var head = document.getElementById("head")
            head.innerHTML =
             `
            <tr>
                <td>Name</td>
                <td>Count</td>
                <td>Time</td>
            </tr>`
            var info = document.getElementById("info")

            // Need to implement padding for heading section (may be fixed with user page)
            for (let index = 0; index < data.lockoutInfo.length; index++) {
                info.innerHTML += 
                `
                <tr >
                    <td>${data.lockoutInfo[index].name}</td>
                    <td>${data.lockoutInfo[index].count}</td>
                    <td>${data.lockoutInfo[index].time}</td>
                </tr>
                `
            }
            document.documentElement.scrollTop = 0;
        })
        .catch((error) => {
            //window.location.href = "../pages/search.html"
            console.log(error)
            handleError(error)
        })



}

getUserInfo()



function createGroupElement(group) {
    let container = document.createElement("div")
    container.classList = "group"
    container.oncontextmenu = function(event) {
        openMenu(event, this)
    }

    let name = document.createElement("h1")
    name.id = "name"
    name.innerHTML = group.name
    name.style.pointerEvents = "none"
    container.appendChild(name)


    if (group.description != "") {
        let description = document.createElement("span")
        description.id = "description"
        let label = document.createElement("strong")
        label.innerHTML = "Description"
        container.appendChild(label)
        description.innerHTML += group.description
        container.appendChild(description)
    }

    if (group.info != "") {
        let information = document.createElement("span")
        information.id = "information"
        let label = document.createElement("strong")
        label.innerHTML = "Information"
        container.appendChild(label)
        information.innerHTML += group.info
        container.appendChild(information)
    }

    return container
}

function scrollToSection(event) {
    event.preventDefault(); 
    const targetId = event.target.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 50,
      behavior: 'smooth'
    });
  }

function openMenu(event, group) {
    event.preventDefault()
    customMenu = document.getElementById('customMenu');
    customMenu.style.display = 'block';  // Show the custom menu
    customMenu.style.left = `${event.pageX}px`;  // Position the menu at mouse X
    customMenu.style.top = `${event.pageY}px`;
    customMenu.setAttribute("hidden", group.children[0].innerHTML)
}


document.addEventListener('click', function(event) {
    if (!customMenu.contains(event.target)) {
      customMenu.style.display = 'none';  // Hide the menu if the click is outside
    }
  });


function copyGroupName() {
    let menu = document.getElementById("customMenu")
    group = menu.getAttribute("hidden")
    console.log(group)
}