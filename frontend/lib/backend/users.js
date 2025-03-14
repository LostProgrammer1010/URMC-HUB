function displayUser(user, body) {
  row = document.createElement("div")
  row.classList.add("row")

  row.onclick = function() {
    pullUpUser(this)
  }

  if (user.disabled) {
    row.id = "disabled"
  } 
  else {
    row.id = "user"
  }

  col1 = document.createElement("span")
  col2 = document.createElement("span")
  col3 = document.createElement("span")
  col1.innerHTML = user.name
  col2.innerHTML = user.username
  col3.innerHTML = user.ou
  row.appendChild(col1)
  row.appendChild(col2)
  row.appendChild(col3)

  body.appendChild(row)
}

// Sends the user to user page when a user is pressed
function pullUpUser(row) {
  console.log(row)
  const username = row.children[1].innerHTML
  sessionStorage.setItem("username", username)
  window.location.href = "../pages/user.html"
  
}

