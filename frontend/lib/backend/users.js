function displayUser(user, body) {
  row = document.createElement("button")
  row.classList.add("row")
  row.tabindex = "1"

  row.onclick = function() {
    pullUpUser(this)
  }
  const labels = Array.from({length: 3}, () => document.createElement("span"))
  const items = Array.from({length: 3}, () => document.createElement("span"))
  const rows = Array.from({length: 3}, () => document.createElement("rows"))
  row.id = "user"
  labels[0]. innerHTML = "<strong>Name:</strong>"
  items[0].innerHTML = user.name
  labels[1].innerHTML = "<strong>Username:</strong>"
  items[1].innerHTML = user.username
  items[1].id = "username"
  labels[2].innerHTML = "<strong>OU:</strong>"
  items[2].innerHTML = user.ou

  if (user.disabled == true){
    items[2].classList.toggle("disabled")
  }



  for (let i = 0; i < items.length; i++){
    labels[i].classList.add("labels")
    rows[i].appendChild(labels[i])
    rows[i].classList.add("items")
    rows[i].appendChild(items[i])
    row.appendChild(rows[i])
  }



  body.appendChild(row)
}

// Sends the user to user page when a user is pressed
function pullUpUser(row) {
  const username = row.querySelector("#username").innerHTML
  sessionStorage.setItem("username", username)
  window.location.href = "../pages/user.html"
  
}

