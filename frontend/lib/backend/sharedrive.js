function displayShareDrive(sharedrive, body) {
  row = document.createElement("div")
  row.classList.add("row")
  row.id = "sharedrive"

  const items = Array.from({length: 2}, () => document.createElement("span"))
  const labels = Array.from({length: 2}, () => document.createElement("span"))
  const rows = Array.from({length: 2}, () => document.createElement("div"))


  labels[0].innerHTML = "<strong>Drive:</strong>"

  items[0].innerHTML =  sharedrive.drive

  labels[1].innerHTML = "<strong>Groups:</strong>"
  
  sharedrive.groups.forEach(group => {
    items[1].innerHTML += `${group}<br>`
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
