

function displayPrinter(printer, body) {

  row = document.createElement("div")
  row.classList.add("row")
  row.id = "printer"

  let items = Array.from({length: 6}, () => document.createElement("span"))
  let labels = Array.from({length: 6}, () => document.createElement("span"))
  let rows = Array.from({length: 6}, () => document.createElement("div"))


  labels[0].innerHTML = "<strong>Name:</strong>"
  labels[1].innerHTML = "<strong>Model:</strong>"
  labels[2].innerHTML = "<strong>IP:</strong>"
  labels[3].innerHTML = "<strong>Proccessor:</strong>"
  labels[4].innerHTML = "<strong>Location:</strong>"
  labels[5].innerHTML = "<strong>Notes:</strong>"

  items[0].innerHTML = ` \\\\${printer.server}\\${printer.queue}`
  items[1].innerHTML = `${printer.model}`
  items[2].innerHTML = `${printer.ip}`
  items[3].innerHTML = `${printer.printProccessor}`
  items[4].innerHTML = `${printer.location}`
  items[5].innerHTML = `${printer.notes}`

  for (let i = 0; i < items.length; i++){
    labels[i].classList.add("labels")
    rows[i].appendChild(labels[i])
    rows[i].classList.add("items")
    rows[i].appendChild(items[i])
    row.appendChild(rows[i])

  }
  body.appendChild(row)
}