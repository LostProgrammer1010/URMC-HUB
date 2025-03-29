var removeQueue = []
var addQueue = []

const updateResponse = document.getElementById("update-response")


async function UpdateGroups() {
  updateResponse.innerHTML = "" 
  if (addQueue.length != 0 ) {
      await addGroupsRequest()
  }
  if (removeQueue.length!= 0 ) {
      await removeGroupsRequest()
  }
  addQueue = []
  removeQueue = []
  changesContainer.innerHTML = ""
  hideUpdateGroups()
  setTimeout(() => {

    setupUserPage()

  }, 1000)

  return
}


async function addGroupsRequest() {

  data = {
      groups: addQueue,
      users: [sessionStorage.getItem("username")],
  }

  await fetch(`http://localhost:8080/user/group/add/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  .then((response) => {
    return response.json()
  })  // Parse the JSON response from the server
  .then((data) => {
    
    data.forEach(group => {
      let groupName = group.group.split(",")[0].slice(3)
      if (group.successful == true){
        updateResponse.innerHTML += `${groupName} was added successfully<br>`
        return
      }
      updateResponse.innerHTML += `${groupName} was not added successfully<br>`
    });
  }).catch(error=> {
    addQueue = []
    console.log(error)
    handleError(error) 
  })
}


function removeGroupsRequest() {

  data = {
      groups: removeQueue,
      users: [sessionStorage.getItem("username")],
  }

  
  fetch(`http://localhost:8080/user/group/remove/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        return response.json()
      }) // Parse the JSON response from the server
      .then(data => {
          data.forEach(group => {
            let groupName = group.group.split(",")[0].slice(3)
            if (group.successful == true){
              updateResponse.innerHTML += `${groupName} was removed successfully<br>`
              return
            }
            updateResponse.innerHTML += `${groupName} was not removed successfully<br>`
          });
      })
      .catch(error=> {
          removeQueue = []
          console.log(error)
          handleError(error)
      })
        
  
}