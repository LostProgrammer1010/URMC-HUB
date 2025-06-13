

function displayPrinter(printer, body) {

  row = document.createElement("button")
  row.classList.add("row")
  row.id = "printer"
  row.tabindex = "1"

  row.oncontextmenu = function(e) {
    e.preventDefault(); // Prevent default context menu
    openGroupContextMenu(e, row);
  }

  row.onclick = function() {
    copyPrinterName(this)
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
      printer.innerHTML += `<strong class="copied">Copied Printer Information</strong>`
  })
  .catch(function () {
      printer.innerHTML += `<strong class="copied">Failed to Copy</strong>`;
  });

  setTimeout(() => {
    printer.innerHTML = temp
  }, 1000);

}

function copyPrinterName(printer){
  let copyString = ""

  const children = printer.children 

  copyString = children[0].getElementsByClassName("value")[0].innerHTML

  const temp = printer.innerHTML

  navigator.clipboard
  .writeText(copyString)
  .then(function () {
      printer.innerHTML += `<strong class="copied">Copied Printer Name</strong>`
  })
  .catch(function () {
      printer.innerHTML += `<strong class="copied">Failed to Copy</strong>`;
  });

  setTimeout(() => {
    printer.innerHTML = temp
  }, 1000);
}


function openGroupContextMenu(e) {
  // Remove any existing context menus
  const existingMenu = document.querySelector('.context-menu');
  if (existingMenu) {
      existingMenu.remove();
  }

  // Create context menu
  const menu = document.createElement('div');
  menu.classList.add('context-menu');
  menu.style.position = 'absolute';
  menu.style.left = e.clientX + 'px';
  menu.style.top = e.clientY + 'px';

  // Add menu items
  const copyOption = document.createElement('div');
  copyOption.classList.add('context-menu-item');
  copyOption.textContent = 'Copy Printer Info';
  copyOption.onclick = () => {
      copyPrinter(e.target.closest('#printer'));
      menu.remove();
  };

  menu.appendChild(copyOption);
  // Close menu when clicking outside or scrolling
  function closeMenu() {
      menu.remove();
      document.removeEventListener('click', closeMenu);
      document.querySelector(".search-container").removeEventListener('scroll', closeMenu);
  }
  
  document.addEventListener('click', function(e) {
      if (!menu.contains(e.target)) {
          closeMenu();
      }
  });
  
  document.querySelector(".search-container").addEventListener('scroll', closeMenu);

  document.body.appendChild(menu);
}