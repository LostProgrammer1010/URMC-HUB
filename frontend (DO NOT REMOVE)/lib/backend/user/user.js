setupUserPage()

var currentGroups = []
const addContainer = document.getElementById("groups-to-add")
const removeContainer = document.getElementById("groups-on-account")
const changesContainer = document.getElementById("change-groups")
const shareContainer = document.getElementById("share-drives")
const membersContainer = document.getElementById("member-of-results")


async function setupUserPage() {
    await getUserInfo()
    checkForIdleAccount()
    document.getElementById("group-search-add").value = ""
    document.getElementById("member-of-search").value = ""
}


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
            element.innerHTML = ""
            data.relationship.forEach((relationship) => {
                element.innerHTML += relationship + "<br>"
            })

            buildGroupsSection(data.groups)
            buildShareDriveSection(data.sharedrives)
            buildLockoutSection(data.lockoutInfo)



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

function buildGroupsSection(groups) {
    membersContainer.innerHTML = ""
    if (groups == null) {
        membersContainer.innerHTML = "No Groups"
        return
    }
    groups.sort((a, b) => a.name.localeCompare(b.name))
    currentGroups = groups
    groups.forEach(group => {
        membersContainer.append(createGroupElement(group))
    });
}

function buildShareDriveSection(sharedrives) {
    const sectionTitle = shareContainer.children[0]
    shareContainer.innerHTML = ""
    shareContainer.appendChild(sectionTitle)
    if (sharedrives == null) {
        shareContainer.innerHTML += "No Access to Share Drives"
        return
    }
    sharedrives.forEach(share => {
        shareContainer.appendChild(createDriveElement(share))
    })
}

function buildLockoutSection(lockoutInfo) {
    var info = document.getElementById("info")
    var head = document.getElementById("head")

    info.innerHTML = ""

    // display lockout results
    
    head.innerHTML =
        `
    <tr>
        <td>Name</td>
        <td>Count</td>
        <td>Time</td>
    </tr>`
    
    // Need to implement padding for heading section (may be fixed with user page)
    for (let index = 0; index < lockoutInfo.length; index++) {
        info.innerHTML += 
        `
        <tr >
            <td>${lockoutInfo[index].name}</td>
            <td>${lockoutInfo[index].count}</td>
            <td>${lockoutInfo[index].time}</td>
        </tr>
        `
    }
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

function showUpdateGroups() {
    const container = document.getElementById("overlay")
    container.hidden = false
    document.body.classList.add("no-scroll")

    const clickHandler = container.addEventListener("click", function(event) {
        if (event.target == container) {
            hideUpdateGroups()
            container.removeEventListener("click", clickHandler)
        } 
    })
    fillGroups()
}

function hideUpdateGroups() {
    const container = document.getElementById("overlay")
    addQueue = []
    removeQueue = []
    changesContainer.innerHTML = ""
    removeContainer.innerHTML = ""
    addContainer.innerHTML = ""
    document.getElementById("group-search-add").value = ""
    document.getElementById("member-of-search").value = ""
    container.hidden = true
    document.body.classList.remove("no-scroll")
}

function fillGroups() {
    removeContainer.innerHTML = ""
    currentGroups.forEach(group => {
        const groupElement = document.createElement("div")
        groupElement.id = "group"
        groupElement.innerHTML = group.name
        groupElement.onclick = function() {
           document.getElementById("info-member-of").innerHTML =  group.info != "" ? group.info : "No Information In AD" 
           document.getElementById("description-member-of").innerHTML = group.description != "" ? group.description : "No Description In AD"
           const alreadySelect = document.querySelector(".selected")
           if (alreadySelect != null) {
               alreadySelect.classList.toggle("selected")
           }
           groupElement.classList.toggle("selected")
        }
        const groupRemoveButton = document.createElement("button")
        groupRemoveButton.id = "remove-group"
        groupRemoveButton.innerHTML = "-"
        groupElement.appendChild(groupRemoveButton)
        groupRemoveButton.onclick = function() {
            if (removeQueue.includes(group.name)) {
                removeContainer.appendChild(groupElement)
                groupRemoveButton.innerHTML = "-"
                groupElement.classList.remove("removed")
                removeQueue.splice(removeQueue.indexOf(group.name), 1)
                return
            }
            removeQueue.push(group.name)
            groupRemoveButton.innerHTML = "+"
            groupElement.classList.add("removed")
            changesContainer.appendChild(groupElement)
        }
        removeContainer.appendChild(groupElement)


    })
}

async function findGroups(inputField,event) {
    
    if (event.key == "Enter") {
        inputField.value = inputField.value.trim()
        await fetch(
            `http://localhost:8080/search/groups/URMC-sh/${inputField.value}`
        )
        .then((response) => {

            return response.json()
        }
            
            ) // Parse the JSON response from the server
        .then((data) => {
            addContainer.innerHTML = ""  
            data.forEach(group => {

                if (addQueue.includes(group.name)) {
                    return
                }


                const groupElement = document.createElement("div")
                groupElement.id = "group"
                groupElement.innerHTML = group.name
                groupElement.onclick = function() {
                    document.getElementById("info-add").innerHTML =  group.info != "" ? group.info : "No Information In AD" 
                    document.getElementById("description-add").innerHTML = group.description != "" ? group.description : "No Description In AD"
                    const alreadySelect = document.querySelector(".selected-add")
                    if (alreadySelect != null) {
                        alreadySelect.classList.toggle("selected-add")
                    }
                    groupElement.classList.toggle("selected-add")
                }
                const groupAddButton = document.createElement("button")
                groupAddButton.id = "add-group"
                groupAddButton.innerHTML = "+"
                groupElement.appendChild(groupAddButton)
                groupAddButton.onclick = function() {
                    if (addQueue.includes(group.name)) {
                        addContainer.appendChild(groupElement)
                        groupAddButton.innerHTML = "+"
                        groupElement.classList.remove("added")
                        addQueue.splice(addQueue.indexOf(group.name), 1)

                        return
                    }
                    groupAddButton.innerHTML = "-"
                    groupElement.classList.add("added")
                    changesContainer.appendChild(groupElement)
                    addQueue.push(group.name)
                }
                addContainer.appendChild(groupElement)

            })

        })
        .catch((error) => {
            console.log(error)
            handleError(error)
        })        
        .finally(() => {
            inputField.focus();
            inputField.select();
        })
}
}

function searchMemberOf(inputField) {
    const memberof = document.getElementById("groups-on-account").children


    if (inputField.value == "") {
        for (let i = 0; i < memberof.length; i++) {
            memberof[i].style.display = "flex"
        }
        return
    }

    for (let i = 0; i < memberof.length; i++) {
        console.log(memberof[i].hidden)
        if (memberof[i].innerHTML.split("<")[0].toLowerCase().includes(inputField.value.toLowerCase())) {
            memberof[i].style.display = "flex"
        } 
        else {
            memberof[i].style.display = "none"
        }
    }

}

function copyAttr(attrField) {
    
    let temp = attrField.innerHTML
    navigator.clipboard.writeText(attrField.innerHTML)
    .then(function () {
        attrField.innerHTML = "Copied"
    })
    .catch(function () {
        attrField.innerHTML = "Copy Failed"
    })

    setTimeout(() => {
        attrField.innerHTML = temp
    }, 1000)
}