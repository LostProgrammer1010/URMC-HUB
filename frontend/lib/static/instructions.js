const instructions = [
  ["Adding Shared Mailbox", "./instructions/Adding_Shared_Mailbox.html", ["Outlook Web", "Outlook Application"]],
  ["Providing Remote Access to Computer", "./instructions/RDP_Access.html", ["RDP Access"]]
]

const instructionContainer = document.getElementById("instructions-container")

function search(input) {
  instructionContainer.innerHTML = ""

  if (input.value == "") {
    instructions.forEach(instruction => {
      displayInstructions(instruction)

    })
    return
  }

  instructions.forEach(instruction => {
    if (instruction[0].toLowerCase().includes(input.value.toLowerCase())){
      displayInstructions(instruction)
    }
  })



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

  const tagContainer = document.createElement("div")
  tagContainer.id = "tag-container"

  instruction[2].forEach(tagTitle => {
    const tag = document.createElement("span")
    tag.innerHTML = tagTitle
    tagContainer.appendChild(tag)
  })

  container.appendChild(tagContainer)



  instructionContainer.appendChild(container)
}


function displayAll() {
  instructions.forEach(instruction => {
    displayInstructions(instruction)
    return
  })
}

displayAll()
