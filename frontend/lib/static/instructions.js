const instructions = [
  ["Adding Shared Mailbox", "./instructions/Adding_Shared_Mailbox.html", ["Outlook Web", "Outlook Application"]],
  ["Providing Remote Access to Computer", "./instructions/RDP_Access.html", ["RDP Access"]],
  ["Email Access on Personal Computer", "./instructions/Email_Access_Personal_Computer.html", ["Email Access", "Personal Computer"]],
  ["IP Adress Global Protect", "./instructions/Getting_IP_Address_Global_Protect.html", ["IP", "Remote", "URMC Computer"]],
  ["Clearing Cache Outlook Application", "./instructions/Clearing_Cache_Outlook.html", ["Outlook Application", "Slow Application"]],
  ["No Sleep on Lid Close", "./instructions/Sleep_Laptop_Keep_Monitor_On.html", ["Laptop", "Keep Monitors ON"]],
  ["Missing eRecord Iocn", "./instructions/Missing_eRecord_Icon.html", ["eRecord icon", "Citrix"]],
  ["Check Status of eRecord account", "./instructions/Inactive_eRecord.html", ["eRecord Access", "LMS Trainings"]]
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
