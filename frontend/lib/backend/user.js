var removeQueue = []

async function getUserInfo() {
    const loading = createLoading()
    const content = document.getElementById("content")
    document.body.appendChild(loading)

    
    if (sessionStorage.getItem("username") == null) {
        window.location.href = "../pages/search.html"
        return
    }

    const username = encodeURI(sessionStorage.getItem("username"))
    localStorage.setItem("username", username)

    await fetch(
        `http://localhost:8080/user/${sessionStorage.getItem("domain")}/${username}`
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

            console.log(data.sharedrives)

            if (data.sharedrives != null) {
                data.sharedrives.forEach(share => {
                    shareContainer.appendChild(createDriveElement(share))
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
            window.location.href = "../pages/search.html"
            console.log(error)
            handleError(error)
        })

    loading.remove()
    content.style.display = "flex"



}





function createGroupElement(group) {
    let container = document.createElement("div")
    container.classList = "group"

    let name = document.createElement("h1")
    name.id = "name"
    name.innerHTML = group.name
    name.style.pointerEvents = "none"
    container.appendChild(name)


    let description = document.createElement("span")
    description.id = "description"
    let label = document.createElement("strong")
    label.innerHTML = "Description"
    label.classList.add("label")
    container.appendChild(label)

    description.innerHTML = group.description != "" ? group.description : "No Description In AD"

    container.appendChild(description)

    let information = document.createElement("span")
    information.id = "information"
    let label2 = document.createElement("strong")
    label2.innerHTML = "Information"
    label2.classList.add("label")
    container.appendChild(label2)

    let remove = document.createElement("button")
    remove.id = "delete"
    remove.innerHTML = "Remove"
    remove.onclick = function() {
        container.classList.toggle("queued")
        if(container.classList.toggle("queued") == true) {
            container.classList.toggle("queued")
            remove.innerHTML = "Remove"
            addToRemoveQueue(this, group.name)
            return
        }
        container.classList.toggle("queued")
        remove.innerHTML = "Cancel"

        addToRemoveQueue(this, group.name)
    }
    container.appendChild(remove)

    information.innerHTML = group.info != "" ? group.info : "No Information In AD"




    container.appendChild(information)

    return container
}


function createDriveElement(share) {
    let container = document.createElement("div")
    container.classList = "group"
    container.oncontextmenu = function(event) {
        openMenu(event, this)
    }

    let name = document.createElement("h1")
    name.id = "name"
    name.innerHTML = share.drive
    name.style.pointerEvents = "none"
    container.appendChild(name)

    let localpath = document.createElement("span")
    localpath.id = "local-path"
    localpath.innerHTML = share.localpath
    let label = document.createElement("strong")
    label.innerHTML = "Local Path: "
    label.classList.add("label")
    container.appendChild(label)


    container.appendChild(localpath)


    let group = document.createElement("span")
    group.id = "group"
    label = document.createElement("strong")
    label.innerHTML = "Group"
    label.classList.add("label")
    container.appendChild(label)

    group.innerHTML = share.groups

    container.appendChild(group)


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

function searchGroups(inputField) {
    const groups = document.getElementById("member-of-results").children

    for (let i = 0; i < groups.length; i++) {
        if (groups[i].classList.toggle("hide")){
            groups[i].classList.toggle("hide")
        }
        const name = groups[i].firstChild.innerHTML.toLowerCase()
        const other = groups[i].querySelectorAll("span")
        if (!name.includes(inputField.value.toLowerCase()) && !other[0].innerHTML.toLowerCase().includes(inputField.value) && !other[1].innerHTML.toLowerCase().includes(inputField.value)){
            groups[i].classList.toggle("hide")
        }

        }
    }

function checkForIdleAccount() {
    const memberof = document.getElementById("member-of-results")
    for (let i = 0; i < memberof.children.length; i++) {
        if (memberof.children[i].firstChild.innerHTML == "IDM_IdleAccounts_URMC") {
            const idle = document.createElement("p")
            idle.id = "idle"
            idle.innerHTML = `This account is a member of the IDM_IdleAccounts_URMC follow <a href="https://urmcprod.service-now.com/kb_view.do?sysparm_article=KB0017280">KB0017280</a> for next steps`
            const nameContainer = document.getElementById("name")
            nameContainer.appendChild(idle)
            break
        }
    }
    
}

function addToRemoveQueue(button, groupName) {

    if (removeQueue.includes(groupName)) {
        button.style.background = "green"
        removeQueue.splice(removeQueue.indexOf(groupName), 1)
    }
    else {
        button.style.background = "red"
        removeQueue.push(groupName)
    }
    let updateButton = document.getElementById("group-update-button")

    if (removeQueue.length > 0) {
        updateButton.hidden = false
        return
    }
    updateButton.hidden = true
}

function updateGroups() {

    data = {
        groups: removeQueue,
        users: [sessionStorage.getItem("username")],
    }

    
    fetch(`http://localhost:8080/user/group/remove/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
    
          return response.json()
        }) // Parse the JSON response from the server
        .then(data => {
            console.log(data)
            if (data.successful == true) {
                document.getElementById("group-update-button").hidden = true
                removeQueue = []
                document.getElementById("update-response").innerHTML = "Successfully Removed Groups Please Refresh the page to see the changes"
                return
            }
            document.getElementById("update-response").innerHTML = `Failed to remove one or more of the following ${removeQueue} Please Refresh the page to see the changes`
        })
        .catch(error=> {
          console.log(error)
          handleError(error)
        })
          
    
}

async function setupUserPage() {
    await getUserInfo()
    checkForIdleAccount()
}


setupUserPage()