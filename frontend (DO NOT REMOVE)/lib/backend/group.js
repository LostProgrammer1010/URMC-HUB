function displayGroup(group, body) {
  row = document.createElement("button")
  row.classList.add("row")
  row.id = "group"
  row.tabindex = "1"

  row.onclick = function() {
    copyGroupName(this, group.name) 
  }

  row.oncontextmenu = function(e) {
    e.preventDefault(); // Prevent default context menu
    openGroupContextMenu(e, row);
  }

  const items = Array.from({length: 4}, () => document.createElement("span"))
  const labels = Array.from({length: 4}, () => document.createElement("span"))
  const rows = Array.from({length: 4}, () => document.createElement("div"))

  
  labels[0].innerHTML = `<strong>Name:</strong>`
  labels[1].innerHTML = `<strong>OU:</strong>`
  labels[2].innerHTML = `<strong>Info:</strong>`
  labels[3].innerHTML = `<strong>Description:</strong>`

  items[0].innerHTML = `${group.name}`
  items[1].innerHTML = `${group.ou}`
  items[2].innerHTML = group.info != "" ? group.info : "No information in AD"
  items[3].innerHTML = group.description != "" ? group.description : "No description in AD"

  if (group.ou.includes("ISD SIG")){
    row.classList.toggle("isd-sig")
    items[1].classList.toggle("isd-sig")
  }


  for (let i = 0; i < items.length; i++){
    labels[i].classList.add("labels")
    rows[i].appendChild(labels[i])
    rows[i].classList.add("items")
    items[i].classList.add("value")
    rows[i].appendChild(items[i])
    row.appendChild(rows[i])

  }
  
  body.appendChild(row)
}

function copyGroup(group) {
  let copyString = ""

  if (timeout == true) {
    return
  }

  timeout = true;
  const children = group.children

  if (printer.getElementsByClassName("copied").length != 0){
    return

  }
  
  for (let i=0; i < children.length; i++){



    const value = children[i].getElementsByClassName("value")[0].innerHTML
    const label = children[i].querySelector("strong").innerHTML

    if (value == ""){
      continue
    }

    copyString += `${label} ${value}\n`

}

  const temp = group.innerHTML

  navigator.clipboard
  .writeText(copyString)
  .then(function () {
      group.innerHTML += `<strong class="copied">Copied Group Info</strong>`
  })
  .catch(function () {
      group.innerHTML += `<strong class="copied">Failed to Copy</strong>`;
  });

  setTimeout(() => {
    group.innerHTML = temp
    timeout = false;  
  }, 1000);
}
let timeout = false;
function copyGroupName(group, groupName) {

  if (timeout == true) {
    return
  }

  timeout = true;

  
  const temp = group.innerHTML

  navigator.clipboard
  .writeText(groupName)
  .then(function () {
      group.innerHTML += `<strong class="copied">Copied Group Name</strong>`
  })
  .catch(function () {
      group.innerHTML += `<strong class="copied">Failed to Copy</strong>`;
  });

  setTimeout(() => {
    group.innerHTML = temp
    timeout = false;  
  }, 1000);
}


function openGroupContextMenu(e, group) {
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
  copyOption.textContent = 'Copy Group Info';
  copyOption.onclick = () => {
      copyGroup(e.target.closest('#group'));
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