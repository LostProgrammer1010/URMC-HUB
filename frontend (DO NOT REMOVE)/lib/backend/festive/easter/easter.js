// Extra notes for Joesph
let all_snowflake = ["egg1.png", "egg2.png", "egg3.png", "egg4.png"];
let falling_eggs = "true";

function GetFallingEggsPrevious() {
    if (localStorage.getItem("falling_eggs") != null) {
        falling_eggs = localStorage.getItem("falling_eggs")
    }

}


function createFallingEasterEggs() {
    let egg = document.createElement("div");

    egg.classList.add("egg");

    const scrolled = window.scrollY;

    egg.style.top = scrolled - 100 + "px";
    egg.style.left = Math.floor(Math.random() * 100) + "%";
    const egg_size = Math.floor(Math.random() * 100) + 100 + "px";
    const egg_type = all_snowflake[Math.floor(Math.random() * all_snowflake.length)];
    egg.style.height = egg_size;
    egg.style.width = egg_size;
    
    egg.style.backgroundImage = `url(../lib/backend/festive/easter/assets/${egg_type})`;

    document.body.appendChild(egg);

    setTimeout(function () {
        egg.style.opacity = 0;
    }, 4000);

    // Remove the snowflake after the css animation is finish
    egg.addEventListener("animationend", function () {
        egg.remove();
    });
}

function putBunniesOnScreen() {
    let bunny = document.createElement("div");
    bunny.classList.add("bunny");
    bunny.id = "bunny1"
    bunny.style.backgroundImage = `url(../lib/backend/festive/easter/assets/bunny1.svg)`;

    let isAnimating = false;
    bunny.addEventListener('mouseenter', () => {
        if (!isAnimating) {
            isAnimating = true;
            bunny.classList.toggle('moved');
            
            // Reset the flag after animation completes
            setTimeout(() => {
                isAnimating = false;
            }, 300); // Match this with your CSS transition duration
        }
    });
    
    document.querySelector("nav").appendChild(bunny);
}

function createToggleButton() {
    let toggle_button = document.createElement("button");
    toggle_button.classList.add("toggle-button");
    toggle_button.innerHTML = "Toggle Eggs";
    toggle_button.onclick = toggleFallingEggs;
    document.body.appendChild(toggle_button);
}


function toggleFallingEggs() {
    if (falling_eggs == "true" ){
       falling_eggs = "false" 
    } else {
        falling_eggs = "true"
    }
    localStorage.setItem("falling_eggs", falling_eggs)
    sessionStorage.setItem("falling_eggs", falling_eggs)
}


setInterval(function() {
    console.log(falling_eggs == "true")
    if (falling_eggs == "true") {
        createFallingEasterEggs()
    }
}, 500)

createToggleButton()
putBunniesOnScreen()
GetFallingEggsPrevious()