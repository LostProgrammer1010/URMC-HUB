// Inject the navbar into the page
document.body.insertAdjacentHTML('afterbegin', 
    `
            <nav>
                <a href="home.html" id="nav-home">
                    <img src="../assets/URMC.ico" alt="URMC LOGO">
                    URMC HUB
                </a>
                <hr>
                <div class="dropdown">
                    <button onClick="drop(this)">LDAP Search <span>></span></button>
                        <div class="content">
                                <a href="./searchusers.html">Users</a>
                                <a href="#">Computers</a>
                                <a href="#">Group</a>
                                <a href="./sharedrive.html">Share Drives</a>
                        </div>
                    </div>
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