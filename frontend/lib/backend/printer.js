

function displayPrinter(printer, body) {

  row = document.createElement("div")
  row.classList.add("row")
  row.id = "printer"



  col1 = document.createElement("span")
  col2 = document.createElement("span")
  col3 = document.createElement("span")
  col4 = document.createElement("span")
  col5 = document.createElement("span")
  col6 = document.createElement("span")

  col1.innerHTML = `\\\\${printer.server}\\${printer.queue}`
  col2.innerHTML = printer.model
  col3.innerHTML = printer.ip
  col4.innerHTML = printer.printProccessor
  col5.innerHTML = printer.location
  col6.innerHTML = printer.notes
  row.appendChild(col1)
  row.appendChild(col2)
  row.appendChild(col3)
  row.appendChild(col4)
  row.appendChild(col5)
  row.appendChild(col6)
  body.appendChild(row)
}