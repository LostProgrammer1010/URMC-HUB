function createGroupElement(group) {
  let container = document.createElement("button")
  container.classList = "group"
  container.onclick = function() {
      copyGroup(this)
  }

  let name = document.createElement("h1")
  name.id = "name"
  name.innerHTML = group.name
  name.style.pointerEvents = "none"
  container.appendChild(name)


  let description = document.createElement("span")
  description.id = "description"
  let label = document.createElement("h2")
  label.innerHTML = "Description"
  label.classList.add("label")
  container.appendChild(label)

  description.innerHTML = group.description != "" ? group.description : "No Description In AD"

  container.appendChild(description)

  let information = document.createElement("span")
  information.id = "information"
  let label2 = document.createElement("h2")
  label2.innerHTML = "Information"
  label2.classList.add("label")
  container.appendChild(label2)

  information.innerHTML = group.info != "" ? group.info : "No Information In AD"

  container.appendChild(information)

  return container
}


function createDriveElement(share) {
  let container = document.createElement("button")
  container.classList = "group"
  container.onclick = function() {
      goToShareDrive(this)
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
  label.innerHTML = "Local Path"
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

function copyGroup(button) {
  button.disabled = true
  copyString = ""
  const temp = button.innerHTML
  const group = button.querySelector("#name")
  const description = button.querySelector("#description")
  const information = button.querySelector("#information")

  copyString += `
Group: ${group.innerHTML}
Description: ${description.innerHTML}
Information: ${information.innerHTML}`

  navigator.clipboard
  .writeText(copyString)
  .then(function () {
      button.innerHTML += `<strong class="copied">Copied</strong>`
  })
  .catch(function () {
      button.innerHTML += `<strong class="copied">Failed to Copy</strong>`;
  });

  setTimeout(() => {
    button.innerHTML = temp
    button.disabled = false
  }, 1000);
}

function goToShareDrive(button) {
  const share = button.querySelector("#name").innerHTML
  sessionStorage.setItem("current-share-drive", share)
  window.location.href = "../pages/share_drive.html"
}