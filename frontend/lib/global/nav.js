// Inject the navbar into the page
document.body.insertAdjacentHTML('afterbegin', 
    `
            <nav oncontextmenu="showNavMenu(event)" id="nav">
                <a href="home.html" id="nav-home" title="Home">
                    <img src="../assets/URMC.ico" alt="URMC LOGO" >
                </a>
                <hr>
                <a href="./search.html" title="LDAP Search">
                    <img src="../assets/Search Icon.png" alt="Search">
                </a>
                <hr>
                <a href="./systemsummary.html" title="System Summary">
                    <img src="../assets/Summary Icon.png" alt="System Summary">
                </a>
                <hr>
                <a href="./groupsadd.html" title="Common AD Groups">
                    <img src="../assets/Group Icon.png" alt="System Summary">
                </a>
            </nav>

            <div id="menu" >
                <button id="move-nav" onclick="moveNav()">Move Nav to other side</button>
            </div>
    `
    );

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