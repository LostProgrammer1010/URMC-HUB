
const path  = window.location.pathname.split("frontend")[0]
console.log(window.location.origin)
//const path = "file:///S:/Cust_Serv/Help Desk Info/Help Desk PC Setup Docs/Home Grown Tools/URMC-HUB/"
// Inject the navbar into the page
document.body.insertAdjacentHTML('afterbegin', 
    `
            <nav oncontextmenu="showNavMenu(event)" id="nav">
                <a href="${path}frontend (DO NOT REMOVE)/pages/home.html" id="nav-link" title="Home">
                    <img src="${path}frontend (DO NOT REMOVE)/assets/URMC.ico" id="nav-img" alt="URMC LOGO" >
                </a>
                <hr>
                <a href="${path}frontend (DO NOT REMOVE)/pages/search.html"  id="nav-link" title="LDAP Search">
                    <img src="${path}frontend (DO NOT REMOVE)/assets/Search Icon.png" id="nav-img" alt="Search">
                </a>
                <hr>
                <a href="${path}frontend (DO NOT REMOVE)/pages/systemsummary.html" id="nav-link"  title="System Summary">
                    <img src="${path}frontend (DO NOT REMOVE)/assets/Summary Icon.png" id="nav-img" alt="System Summary">
                </a>
                <hr>
                <a href="${path}frontend (DO NOT REMOVE)/pages/instructions.html" id="nav-link" title="Instruction">
                    <img src="${path}frontend (DO NOT REMOVE)/assets/Notes_Icon.png" id="nav-img" alt="Instructions">
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

/*                
<a href="${path}frontend (DO NOT REMOVE)/pages/groupsadd.html" id="nav-link" title="Common AD Groups">
    <img src="${path}frontend (DO NOT REMOVE)/assets/Group Icon.png" id="nav-img" alt="System Summary">
</a> 

*/