function displayShareDrive(sharedrive, body) {
  row = document.createElement("div")
  row.classList.add("row")
  row.id = "sharedrive"

  row.onclick = function() {
    pullShareDrive(this)
  }

  const items = Array.from({length: 3}, () => document.createElement("span"))
  const labels = Array.from({length: 3}, () => document.createElement("span"))
  const rows = Array.from({length: 3}, () => document.createElement("div"))


  labels[0].innerHTML = "<strong>Drive:</strong>"


  items[0].id = "share-drive"
  items[0].innerHTML =  sharedrive.drive

  labels[1].innerHTML = "<strong>LocalPath: </strong>"

  items[1].innerHTML = sharedrive.localpath

  labels[2].innerHTML = "<strong>Groups:</strong>"
  
  sharedrive.groups.forEach(group => {
    items[2].innerHTML += `${group}<br>`
  });

  for (let i = 0; i < items.length; i++){
    labels[i].classList.add("labels")
    rows[i].appendChild(labels[i])
    rows[i].classList.add("items")
    rows[i].appendChild(items[i])
    row.appendChild(rows[i])

  }

  body.appendChild(row)


}

function pullShareDrive() {
  const share = row.querySelector("#share-drive").innerHTML
  sessionStorage.setItem("current-share-drive", share)
  window.location.href = "../pages/share_drive.html"
}
