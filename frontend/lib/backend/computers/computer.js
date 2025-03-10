function ping() {
    document.getElementById("loading").style.display = "flex"

    const input = localStorage.getItem("computername")

    const response = fetch(`http://localhost:8080/ping/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: input }),
    })
        .then((response) => {
            return response.json()
        }) // Parse the JSON response from the server
        .then((data) => {
            console.log(data)
            document.getElementById("ping-results").innerHTML = data
            document.getElementById("loading").style.display = "none"
        })
        .catch((error) => {
            document.getElementById("loading").style.display = "none"
            console.log(error)
            handleError(error)
        })
}

function restart() {
    document.getElementById("loading").style.display = "flex"

    const input = localStorage.getItem("computername")

    const response = fetch(`http://localhost:8080/restart/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: input }),
    })
        .then((response) => {
            return response.json()
        }) // Parse the JSON response from the server
        .then((data) => {
            console.log(data)
            document.getElementById("restart-results").innerHTML = data
            document.getElementById("loading").style.display = "none"
        })
        .catch((error) => {
            document.getElementById("loading").style.display = "none"
            console.log(error)
            handleError(error)
        })
}
