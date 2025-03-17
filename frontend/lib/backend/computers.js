function displayComputer(computer, body) {
  row = document.createElement("div")
  row.classList.add("row")
  row.id = "computer"

  row.onclick = function() {
    pullUpComputer(this)
  }

  const items = Array.from({length: 2}, () => document.createElement("span"))
  const labels = Array.from({length: 2}, () => document.createElement("span"))
  const rows = Array.from({length: 2}, () => document.createElement("span"))


  labels[0].innerHTML = `<strong>Name:</strong>`
  labels[0].id = "username"
  labels[1].innerHTML = `<strong>OU:</strong>`

  items[0].innerHTML = `${computer.name}`
  items[1].innerHTML = `${computer.ou}`


  for (let i = 0; i < items.length; i++){
    labels[i].classList.add("labels")
    rows[i].appendChild(labels[i])
    rows[i].classList.add("items")
    rows[i].appendChild(items[i])
    row.appendChild(rows[i])

  }

  body.appendChild(row)
}


function pullUpComputer(row) {
  const computer = row.querySelector("#username").innerHTML
  sessionStorage.setItem("computername", computer)
  window.location.href = "../pages/computer.html"
}
