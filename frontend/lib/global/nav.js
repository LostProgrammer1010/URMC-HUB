// Inject the navbar into the page
document.body.insertAdjacentHTML('afterbegin', 
    `
            <nav>
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
                <a href="./groupsadd.html">
                    <img src="../assets/Group Icon.png" alt="System Summary">
                </a>
                <hr>
                <a href="#">eRecord Group Summaries</a>
                </div>
            </nav>
    `
    );


    // nextElementSibling
function drop(element) {
    const parent = element.parentElement
    parent.classList.toggle('open')
    element.children[0].classList.toggle('rotate')
}