

function displayPrinter(printer, body) {

  row = document.createElement("button")
  row.classList.add("row")
  row.id = "printer"
  row.tabindex = "1"

  row.onclick = function() {
    copyPrinter(this)
  }

  let items = Array.from({length: 6}, () => document.createElement("span"))
  let labels = Array.from({length: 6}, () => document.createElement("span"))
  let rows = Array.from({length: 6}, () => document.createElement("div"))


  labels[0].innerHTML = "<strong>Name:</strong>"
  labels[1].innerHTML = "<strong>Model:</strong>"
  labels[2].innerHTML = "<strong>IP:</strong>"
  labels[3].innerHTML = "<strong>Processor:</strong>"
  labels[4].innerHTML = "<strong>Location:</strong>"
  labels[5].innerHTML = "<strong>Notes:</strong>"

  items[0].innerHTML = ` \\\\${printer.server}\\${printer.queue}`
  items[1].innerHTML = `${printer.model}`
  items[2].innerHTML = `${printer.ip}`
  items[3].innerHTML = `${printer.printProccessor}`
  items[4].innerHTML = `${printer.location}`
  items[5].innerHTML = `${printer.notes}`

  document.getElementsByClassName

  for (let i = 0; i < items.length; i++){
    labels[i].classList.add("labels")
    rows[i].appendChild(labels[i])
    items[i].classList.add("value")
    rows[i].classList.add("items")
    rows[i].appendChild(items[i])
    row.appendChild(rows[i])

  }
  body.appendChild(row)
}

function copyPrinter(printer) {
  let copyString = ""

  const children = printer.children

  if (printer.getElementsByClassName("copied").length != 0){
    return

  }
  
  for (let i=0; i < children.length; i++){
    const value = children[i].getElementsByClassName("value")[0].innerHTML
    console.log(value)
    const label = children[i].querySelector("strong").innerHTML

    copyString += `${label} ${value}\n`

}

  const temp = printer.innerHTML

  navigator.clipboard
  .writeText(copyString)
  .then(function () {
      printer.innerHTML += `<strong class="copied">Copied</strong>`
  })
  .catch(function () {
      printer.innerHTML += `<strong class="copied">Failed to Copy</strong>`;
  });

  setTimeout(() => {
    printer.innerHTML = temp
  }, 1000);



}