function displayGroup(group, body) {
  row = document.createElement("div")
  row.classList.add("row")
  row.id = "group"

  const items = Array.from({length: 2}, () => document.createElement("span"))
  const labels = Array.from({length: 2}, () => document.createElement("span"))
  const rows = Array.from({length: 2}, () => document.createElement("div"))

  
  labels[0].innerHTML = `<strong>Name:</strong>`
  labels[1].innerHTML = `<strong>OU:</strong>`

  items[0].innerHTML = `${group.name}`
  items[1].innerHTML = `${group.ou}`


  for (let i = 0; i < items.length; i++){
    labels[i].classList.add("labels")
    rows[i].appendChild(labels[i])
    rows[i].classList.add("items")
    rows[i].appendChild(items[i])
    row.appendChild(rows[i])

  }
  
  body.appendChild(row)
}
