// Inject the navbar into the page
document.body.insertAdjacentHTML('afterbegin', 
    `
            <nav>
                <a href="home.html" id="nav-home">
                    <img src="../assets/URMC.ico" alt="URMC LOGO">
                    URMC HUB
                </a>
                <hr>
                <a href="./search.html">LDAP Search</a>
                <hr>
                <a href="./systemsummary.html">System Summary</a>
                <hr>
                <a href="./groupsadd.html">AD Groups</a>
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