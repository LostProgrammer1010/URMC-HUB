function displayShareDrive(sharedrive, body) {
  row = document.createElement("div")
  row.classList.add("row")
  row.id = "sharedrive"


  col1 = document.createElement("span")
  col2 = document.createElement("span")

  col1.innerHTML = sharedrive.drive
  
  sharedrive.groups.forEach(group => {
    col2.innerHTML += `${group}<br>`
  });


  row.appendChild(col1)
  row.appendChild(col2)

  body.appendChild(row)
}
