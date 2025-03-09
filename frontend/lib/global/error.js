

function handleError(error) {
  var message
  switch (error.message.toLowerCase()) {
    case "failed to fetch":
      message = "Server not Started"
      createErorr(message)
      removeMessageAuto()
      break
    default:
      var message = "Something unexpected happened"
      createErorr(message)
      removeMessageAuto()
  }
}

function removeMessage() {
  document.body.removeChild(document.getElementById("error"))
}

function removeMessageAuto() {
  setInterval(() => {
    const error = document.getElementById("error")
    if (error != null) {
      document.body.removeChild(error)
    }

  }, 6000)
}

function createErorr(message) {

  let errorPopUp = document.createElement("div")
  errorPopUp.id = "error"

  let exitButton = document.createElement("button")
  exitButton.id = "error-button"
  exitButton.innerHTML = "X"
  exitButton.onclick = removeMessage

  errorPopUp.innerHTML += message

  errorPopUp.appendChild(exitButton)

  document.body.appendChild(errorPopUp)
}