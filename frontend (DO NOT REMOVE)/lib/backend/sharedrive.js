
var share;
var currentShare;

async function sharedrivePageSetup() {
    getCurrentShare()
    await getGroupsShareDrive()
}


async function getGroupsShareDrive() {

  share = share.trim()

  encodeURI
  
  await fetch(`http://localhost:8080/sharedrive/${encodeURI(share)}`, {
    method: "GET",
  })
  .then(response => {
      
    if (!response.ok) {
      response.text().then(message => {
       if (response.status == 500) {
         handleError(new InternalServerError(message))
       }
       if (response.status == 400) {
         handleError(new BadRequestError(message))
       }
      }) 
      return
     }
    return response.json()
  })// Parse the JSON response from the server
    .then(data => {
      if (data.length == 0) {
        window.location.href = "../pages/search.html"
      }
      buildPage(data)

    })
    .catch(error=> {
      handleError(error)
    })
}


function getCurrentShare() {
  console.log(sessionStorage.getItem("current-share-drive"))
  if (sessionStorage.getItem("current-share-drive") != null) {
      share = sessionStorage.getItem("current-share-drive")
      localStorage.setItem("current-share-drive", share)
      return
  } 
    window.location.href = "../pages/search.html"
}

sharedrivePageSetup()



function buildPage(sharedrive) {

  const name = document.getElementById("share-drive-name")
  name.innerHTML = sharedrive.sharedrive

  
  const groups = document.getElementById("share-drive-groups")

  

  sharedrive.groups.sort((a, b) => a.name.localeCompare(b.name))

  sharedrive.groups.forEach(group => {
    groups.appendChild(buildGroups(group))
  });

}

function buildGroups(group) {
  const items = Array.from({length: 3}, () => document.createElement("span"))
  const labels = Array.from({length: 3}, () => document.createElement("label"))

  const row = document.createElement("button")

  row.onclick = function() {
    copyGroupName(this, group.name) 
  }

  row.oncontextmenu = function(e) {
    e.preventDefault(); // Prevent default context menu
    openGroupContextMenu(e);
  }

  items[0].innerHTML = group.name
  items[0].id = "name"

  row.appendChild(items[0])
  row.id = "group"

  labels[1].innerHTML = "Description: "
  labels[2].innerHTML = "Information: "
  items[1].innerHTML = group.description != "" ? group.description : "No Description In AD"
  items[2].innerHTML = group.info != "" ? group.info : "No Information In AD"

  for (let i=1; i < items.length; i++) {
   row.appendChild(labels[i])
   row.appendChild(items[i])
  }
  return row
}

function copyGroup(button) {
  button.disabled = true
  copyString = ""
  const values = button.querySelectorAll("span")

  copyString = `
Group: ${values[0].innerHTML}
Description: ${values[1].innerHTML}
Information: ${values[2].innerHTML}`
const temp = button.innerHTML
  navigator.clipboard
  .writeText(copyString)
  .then(function () {
      button.innerHTML += `<strong class="copied">Copied Group Information</strong>`
  })
  .catch(function () {
      button.innerHTML += `<strong class="copied">Failed to Copy</strong>`;
  });


  setTimeout(() => {

    button.innerHTML = temp
    button.disabled = false
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
      document.body.removeEventListener('scroll', closeMenu);
  }
  
  document.addEventListener('click', function(e) {
      if (!menu.contains(e.target)) {
          closeMenu();
      }
  });
  
  document.body.addEventListener('scroll', closeMenu);

  document.body.appendChild(menu);
}