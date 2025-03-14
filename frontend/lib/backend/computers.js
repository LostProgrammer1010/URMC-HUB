function displayComputer(computer, body) {
  row = document.createElement("div")
  row.classList.add("row")
  row.id = "computer"

  row.onclick = function() {
    pullUpComputer(this)
  }

  col1 = document.createElement("span")
  col2 = document.createElement("span")
  col1.innerHTML = computer.name
  col2.innerHTML = computer.ou
  row.appendChild(col1)
  row.appendChild(col2)
  body.appendChild(row)
}


function pullUpComputer(row) {
  const computername = row.children[0].innerHTML
  sessionStorage.setItem("computername", computername)
  window.location.href = "../pages/computer.html"
}
