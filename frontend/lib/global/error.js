/* Every that might have an error will need error.js and error.css in it */

// Handling of all error that might be encounter in the fronend
function handleError(error) {
  var message
  switch (error.name) {
    case "TypeError":
      if (error.message.includes("fetch")) {
        message = "Server not Started"
        createErorr(message)
        removeMessageAuto()
        break
      }
      console.log(error)
      break
    case "InternalServerError":
      message = `InternalServerError: ${error.message}`
      createErorr(message)
      removeMessageAuto()
      break
      case "BadRequestError":
        message = `BadRequest: ${error.message}`
        createErorr(message)
        removeMessageAuto()
        break
    default:
      var message = error.message
      createErorr(error.stack)
      removeMessageAuto()
      console.error(error) // Unexpected errors will be printed to logs
  }
}


// Removes the error message if the X is clicked
function removeMessage() {
  document.body.removeChild(document.getElementById("error"))
}


// Error message will disappear after 6s
function removeMessageAuto() {
  setInterval(() => {
    const error = document.getElementById("error")
    if (error != null) {
      document.body.removeChild(error)
    }

  }, 11000)
}


// Create the error with the message that is is given
function createErorr(message) {

  let errorPopUp = document.createElement("div")
  errorPopUp.id = "error"

  let errorIcon = document.createElement("img")
  errorIcon.src = "../assets/error_icon.png"

  errorPopUp.appendChild(errorIcon)

  let exitButton = document.createElement("button")
  exitButton.id = "error-button"
  exitButton.innerHTML = "X"
  exitButton.onclick = removeMessage

  errorPopUp.innerHTML += message

  errorPopUp.appendChild(exitButton)

  document.body.appendChild(errorPopUp)
}


class InternalServerError extends Error {
  constructor(message) {
    super(message)
    this.name = "InternalServerError"
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = "BadRequestError"
  }
}