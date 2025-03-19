const instructions = [
  ["Adding Shared Mailbox", "./instructions/Adding_Shared_Mailbox.html", ["Outlook Web"]]
]

const instructionContainer = document.getElementById("instructions-container")

function search(input) {


  if (input == "") {
    instructions.forEach(instruction => {
      displayInstructions(instruction)
    })
  }

}

function displayInstructions(instruction) {
  const container = document.createElement("div")
  container.id = "link-container"

  const a = document.createElement("a")
  a.href = instruction[1]
  a.title = `Go to ${instruction[1]}`

  const title = document.createElement("h1")
  title.classList.add("title")
  title.innerHTML = instruction[0]

  a.appendChild(title)
  container.appendChild(a)

  instructionContainer.appendChild(container)
}

search("")