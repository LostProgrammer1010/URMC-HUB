
var share;
var currentShare;

async function sharedrivePageSetup() {
    getCurrentShare()
    await getGroupsShareDrive()
}


async function getGroupsShareDrive() {

  share = share.trim()

  encodeURI
  
  await fetch(`http://localhost:8080/sharedrive/${encodeURI(share)}`, {
    method: "GET",
  })
    .then(response => {
      return response.json()
    }) // Parse the JSON response from the server
    .then(data => {
      if (data.length == 0) {
        throw new Error("Failed to get share drive")
      }
      buildPage(data)

    })
    .catch(error=> {
      handleError(error)
    })
}


function getCurrentShare() {
  console.log(sessionStorage.getItem("current-share-drive"))
  if (sessionStorage.getItem("current-share-drive") != null) {
      share = sessionStorage.getItem("current-share-drive")
      localStorage.setItem("current-share-drive", share)
      return
  } 
    window.location.href = "../pages/user.html"
}

sharedrivePageSetup()



function buildPage(sharedrive) {

  const name = document.getElementById("share-drive-name")
  name.innerHTML = sharedrive.sharedrive

  
  const groups = document.getElementById("share-drive-groups")

  

  sharedrive.groups.sort((a, b) => a.name.localeCompare(b.name))

  sharedrive.groups.forEach(group => {
    groups.appendChild(buildGroups(group))
  });

}

function buildGroups(group) {
  const items = Array.from({length: 3}, () => document.createElement("span"))
  const labels = Array.from({length: 3}, () => document.createElement("label"))

  const div = document.createElement("div")

  items[0].innerHTML = group.name
  items[0].id = "name"
  div.appendChild(items[0])
  div.id = "group"
  labels[1].innerHTML = "Description: "
  labels[2].innerHTML = "Information: "
  items[1].innerHTML = group.description != "" ? group.description : "No Description In AD"
  items[2].innerHTML = group.info != "" ? group.info : "No Information In AD"

  for (let i=1; i < items.length; i++) {
   div.appendChild(labels[i])
   div.appendChild(items[i])
  }
  return div
}