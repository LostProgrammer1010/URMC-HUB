
var share;
var currentShare;

function sharedrivePageSetup() {
    getCurrentShare()
    getGroupsShareDrive()
}


function getGroupsShareDrive() {

  console.log("share",share)

  data = {
    value: share.trim(),
  }

  fetch(`http://localhost:8080/search/sharedrives/`, {
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
      if (data.length == 0) {
        throw new Error("Failed to get share drive")
      }
      console.log(data)

    })
    .catch(error=> {
      handleError(error)
    })
}


function getCurrentShare() {
  console.log(sessionStorage.getItem("current-share-drive"))
  if (sessionStorage.getItem("current-share-drive") != null) {
      share = sessionStorage.getItem("current-share-drive")
      localStorage.setItem("current-share-drive", share)
      return
  } 
    window.location.href = "../pages/user.html"
}

sharedrivePageSetup()