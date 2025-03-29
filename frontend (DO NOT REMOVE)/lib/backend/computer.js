var computer;
const COOLDOWN_TIME = 3000; // 5 seconds cooldown
let lastPingTime = 0;
let lastRestartTime = 0;

function ping() {
    const now = Date.now();
    if (now - lastPingTime < COOLDOWN_TIME) {
        document.getElementById("wait").innerHTML = `Please wait ${Math.ceil((COOLDOWN_TIME - (now - lastPingTime)) / 1000)} seconds before pinging again.`;
        return;
    }
    lastPingTime = now;

    fetch(`http://localhost:8080/ping/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: computer }),
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
      }) 
        .then((data) => {
            document.getElementById("results").innerHTML = data
        })
        .catch((error) => {
            handleError(error)
        })
}

function restart() {
    const now = Date.now();
    if (now - lastRestartTime < COOLDOWN_TIME) {
        document.getElementById("wait").innerHTML = `Please wait ${Math.ceil((COOLDOWN_TIME - (now - lastRestartTime)) / 1000)} seconds before restarting again.`;
        return;
    }
    lastRestartTime = now;
    

    fetch(`http://localhost:8080/restart/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: computer }),
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
      }) // Parse the JSON response from the server
        .then((data) => {
            document.getElementById("results").innerHTML = data
        })
        .catch((error) => {
            handleError(error)
        })
}

function computerPageSetup() {
    if (sessionStorage.getItem("computername") == null) {
        document.location.href = "../pages/search.html"
        return
    }
    computer = sessionStorage.getItem("computername")
    localStorage.setItem("computername", sessionStorage.getItem("computername"))
    document.getElementById("computer-name").innerHTML = sessionStorage.getItem("computername")
}


computerPageSetup()