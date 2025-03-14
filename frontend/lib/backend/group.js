function displayGroup(group, body) {
  row = document.createElement("div")
  row.classList.add("row")
  row.id = "group"

  col1 = document.createElement("span")
  col2 = document.createElement("span")
  col1.innerHTML = group.name
  col2.innerHTML = group.ou
  row.appendChild(col1)
  row.appendChild(col2)
  body.appendChild(row)
}
