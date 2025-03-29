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