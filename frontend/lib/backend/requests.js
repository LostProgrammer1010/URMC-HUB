


function getSearchCriteria(input) {
  input = input.replace(/\s+/g, ' ').trim();

  splitSearch = input.split(" ")

  switch (splitSearch[0]) {
    case 'u': return ['u', splitSearch.slice(1).join(" ")]
    case 'p': return ['p', splitSearch.slice(1).join(" ")]
    case 'c': return ['c', splitSearch.slice(1).join(" ")]
    case 's': return ['s', splitSearch.slice(1).join(" ")]
    case 'g': return ['g', splitSearch.slice(1).join(" ")]
    case 'a': return ['a', splitSearch.slice(1).join(" ")]
    default: return ['a', splitSearch.join(" ")]
  }
}


function getSearch(searchValue, filter) {
  content.innerHTML = ""
  content.appendChild(loading)
  currentPage = 1
  domain = "urmc-sh"
  /*
  if (document.getElementById("URcheckbox").checked) {
    domain = "ur"
  } else {
    domain = "urmc-sh"
  }
  */
  searchValue = encodeURIComponent(searchValue)
  console.log(searchValue)
  sessionStorage.setItem("domain", domain)
    fetch(`http://localhost:8080/search/${filter}/${domain}/${searchValue}`)
    .then(response => response.json()) 
    .then(data => {
      pagingdata = data

      content.removeChild(loading)

      displayTable(currentPage)


    })
    .catch(error => {
      handleError(error)

    })
}


function postSearch(searchValue, filter) {
  content.innerHTML = ""
  content.appendChild(loading)
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
      content.removeChild(loading)

      pagingdata = data
      console.log(pagingdata)

      displayTable(currentPage)

    })
    .catch(error=> {
      handleError(error)
    })

}

function postSearchAll(searchValue, filter) {
  content.innerHTML = ""
  content.appendChild(loading)
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
      content.removeChild(loading)


      pagingdata = [...data.users, ...data.computers, ...data.groups, ...data.printers, ...data.shares]

      pagingdata = pagingdata.sort(() => Math.random() - 0.5);


      displayTable(currentPage) 

    })
    .catch(error=> {
      console.log(error)
      handleError(error)
    })
}