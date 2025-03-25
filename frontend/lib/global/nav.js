const path  = window.location.pathname.split("frontend")[0]

// Inject the navbar into the page
document.body.insertAdjacentHTML('afterbegin', 
    `
            <nav oncontextmenu="showNavMenu(event)" id="nav">
                <a href="${path}frontend/pages/home.html" id="nav-link" title="Home">
                    <img src="${path}frontend/assets/URMC.ico" id="nav-img" alt="URMC LOGO" >
                </a>
                <hr>
                <a href="${path}frontend/pages/search.html"  id="nav-link" title="LDAP Search">
                    <img src="${path}frontend/assets/Search Icon.png" id="nav-img" alt="Search">
                </a>
                <hr>
                <a href="${path}frontend/pages/systemsummary.html" id="nav-link"  title="System Summary">
                    <img src="${path}frontend/assets/Summary Icon.png" id="nav-img" alt="System Summary">
                </a>
                <hr>
                <a href="${path}frontend/pages/instructions.html" id="nav-link" title="Instruction">
                    <img src="${path}frontend/assets/Notes_Icon.png" id="nav-img" alt="Instructions">
                </a>
                <hr>
                <a href="${path}frontend/pages/groupsadd.html" id="nav-link" title="Common AD Groups">
                    <img src="${path}frontend/assets/Group Icon.png" id="nav-img" alt="System Summary">
                </a>
            </nav>

            <div id="menu" >
                <button id="move-nav" onclick="moveNav()">Move Nav to other side</button>
            </div>
    `
    );

    console.log()

const menu = document.getElementById("menu")
  
  document.addEventListener('click', function(event) {
    if (!menu.contains(event.target)) {
      menu.style.display = 'none';  // Hide the menu if the click is outside
    }
  });

function showNavMenu(event) {
    event.preventDefault()

    if (document.body.classList.length >= 1) {
        menu.style.display = 'block';  // Show the custom menu
        menu.style.left = `${event.pageX - 100}px`;  // Position the menu at mouse X
        menu.style.top = `${event.pageY}px`;
        return
    }

    menu.style.display = 'block';  // Show the custom menu
    menu.style.left = `${event.pageX }px`;  // Position the menu at mouse X
    menu.style.top = `${event.pageY}px`;

}


function moveNav() {
    menu.style.display = "none"
    if (document.body.classList.toggle("nav-right")) {
        sessionStorage.setItem("nav", "nav-right")
        localStorage.setItem("nav", "nav-right")
    }
    else {
        sessionStorage.setItem("nav", "")
        localStorage.setItem("nav", "")
    }
}

function setupNav() {
    const nav = sessionStorage.getItem("nav")

    if (nav == null || nav == ""){
        return
    }
    moveNav()
}

setupNav()