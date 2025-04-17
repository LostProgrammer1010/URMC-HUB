// Extra notes for Joesph
let all_eggs = ["egg1.png", "egg2.png", "egg3.png", "egg4.png"];
let falling_eggs = "true";

function GetFallingEggsPrevious() {
    if (sessionStorage.getItem("falling_eggs") != null) {


        falling_eggs = sessionStorage.getItem("falling_eggs")

    } 
    if (falling_eggs == "true") {
        document.getElementById("toggle-button").classList.toggle("active")
    }
    

}


function createFallingEasterEggs() {
    let egg = document.createElement("div");

    egg.classList.add("egg");

    const scrolled = window.scrollY;

    egg.style.top = scrolled - 100 + "px";
    egg.style.left = Math.floor(Math.random() * 100) + "%";
    const egg_size = Math.floor(Math.random() * 100) + 100 + "px";
    const egg_type = all_eggs[Math.floor(Math.random() * all_eggs.length)];
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
    toggle_button.id = "toggle-button";
    toggle_button.classList.add("toggle-button");
    toggle_button.innerHTML = "Toggle Eggs";
    toggle_button.onclick = function() {
        toggleFallingEggs(this)
    };
    document.body.appendChild(toggle_button);
}


function toggleFallingEggs(button) {
    if (falling_eggs == "true" ){
       falling_eggs = "false" 
    } else {
        falling_eggs = "true"
    }
    button.classList.toggle("active");
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


let cursorFollower = document.createElement('div');

function createCursorFollower() {
    cursorFollower.classList.add('cursor-follower');
    cursorFollower.style.backgroundImage = `url(../lib/backend/festive/easter/assets/bunny2.svg)`;
    document.body.appendChild(cursorFollower);

    let lastEggTime = 0;
    const eggDropInterval = 500; // Drop egg every 500ms

    document.addEventListener('mousemove', (e) => {
        const bunnySize = 40;
        const maxX = window.innerWidth - bunnySize;
        const maxY = window.innerHeight - bunnySize;
        
        const x = Math.min(maxX, e.clientX + 40);
        const y = Math.min(maxY, e.clientY + 40);
        
        cursorFollower.style.left = x + 'px';
        cursorFollower.style.top = y + 'px';

        // Drop eggs periodically while moving
        const currentTime = Date.now();
        if (currentTime - lastEggTime > eggDropInterval) {
            let egg = document.createElement("div");
            egg.classList.add("egg");
            egg.style.top = y + 'px';
            egg.style.left = x + 'px';
            
            const egg_type = all_eggs[Math.floor(Math.random() * all_eggs.length)];
            egg.style.backgroundImage = `url(../lib/backend/festive/easter/assets/${egg_type})`;
            
            egg.style.height = "40px";
            egg.style.width = "40px";
            
            document.body.appendChild(egg);

            setTimeout(() => {
                egg.style.opacity = 0;
            }, 4000);

            egg.addEventListener("animationend", () => {
                egg.remove();
            });

            lastEggTime = currentTime;
        }
    });
}

createCursorFollower();