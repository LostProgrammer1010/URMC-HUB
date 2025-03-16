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

            const shareContainer = document.getElementById("share-drives")

            if (!data.sharedrives == null) {
                data.sharedrives.forEach(share => {
                    shareContainer.innerHTML += `
                    <div>${share.drive}</div>
                    <div>${share.groups}</div>
                    <br>
                    `
                })
            }
            else {
                shareContainer.innerHTML += "No Access to Share Drives"
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

    container.appendChild(document.createElement("hr"))

    let description = document.createElement("span")
    description.id = "description"
    let label = document.createElement("strong")
    label.innerHTML = "Description"
    label.classList.add("label")
    container.appendChild(label)

    let information = document.createElement("span")
    information.id = "information"
    let label2 = document.createElement("strong")
    label2.innerHTML = "Information"
    label2.classList.add("label")
    container.appendChild(label2)

    description.innerHTML = group.description != "" ? group.description : "No Description In AD"
    description.innerHTML = group.info != "" ? group.info : "No Information In AD"


    container.appendChild(description)
    container.appendChild(information)

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

