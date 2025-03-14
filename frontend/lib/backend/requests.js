
function getSearch(searchValue, filter) {
  currentPage = 1
  domain = "urmc-sh"
  /*
  if (document.getElementById("URcheckbox").checked) {
    domain = "ur"
  } else {
    domain = "urmc-sh"
  }
  */
  sessionStorage.setItem("domain", domain)
    fetch(`http://localhost:8080/search/${filter}/${domain}/${searchValue}`)
    .then(response => response.json()) 
    .then(data => {
      pagingdata = data

      displayTable(currentPage)


    })
    .catch(error => {
      handleError(error)

    })
}


function postSearch(searchValue, filter) {
  currentPage = 1
  domain = "urmc-sh"
  sessionStorage.setItem("domain", domain)

  data = {
    value: searchValue,
    domain: domain
  }

  fetch(`http://localhost:8080/search/${filter}/`, {
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


      pagingdata = data

      displayTable(currentPage)

    })
    .catch(error=> {
      handleError(error)
    })

}

function postSearchAll(searchValue, filter) {
  currentPage = 1
  domain = "urmc-sh"
  sessionStorage.setItem("domain", domain)

  data = {
    value: searchValue,
    domain: domain
  }

  fetch(`http://localhost:8080/search/${filter}/`, {
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

      pagingdata = [...data.users, ...data.computers, ...data.groups, ...data.printers, ...data.shares]

      pagingdata = pagingdata.sort(() => Math.random() - 0.5);

      displayTable(currentPage) 

    })
    .catch(error=> {
      handleError(error)
    })
}