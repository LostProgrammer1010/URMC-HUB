


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
  const loading = createLoading()
  content.appendChild(loading)
  currentPage = 1
  domain = "urmc-sh"
  searchValue = encodeURIComponent(searchValue)
  console.log(searchValue)
  sessionStorage.setItem("domain", domain)
    fetch(`http://localhost:8080/search/${filter}/${domain}/${searchValue}`)
    .then(response => {

      if (!response.ok) {
       response.text().then(message => {
        if (response.status == 500) {
          handleError(new InternalServerError(message))
        }
        if (response.status == 400) {
          handleError(new BadRequestError(message))
        }
       }) 

       return
      }
    
      return response.json()
    }) 
    .then(data => {
      pagingdata = data

      displayTable(currentPage)


    })
    .catch(error => {
      handleError(error)

    })
    loading.remove()
}


function postSearch(searchValue, filter) {
  content.innerHTML = ""
  const loading = createLoading()
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

      if (!response.ok) {
        response.text().then(message => {
         if (response.status == 500) {
           handleError(new InternalServerError(message))
         }
         if (response.status == 400) {
           handleError(new BadRequestError(message))
         }
        }) 
        return
       }
      return response.json()
    }) // Parse the JSON response from the server
    .then(data => {
      loading.remove()

      pagingdata = data

      displayTable(currentPage)

    })
    .catch(error=> {
      handleError(error)
    })

}

function postSearchAll(searchValue, filter) {
  content.innerHTML = ""
  const loading = createLoading()
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
      
      if (!response.ok) {
        response.text().then(message => {
         if (response.status == 500) {
           handleError(new InternalServerError(message))
         }
         if (response.status == 400) {
           handleError(new BadRequestError(message))
         }
        }) 
        return
       }
      return response.json()
    }) // Parse the JSON response from the server
    .then(data => {

      loading.remove()

      pagingdata = []
      
      const maxLength = Math.max(
        data.users.length, 
        data.computers.length, 
        data.groups.length, 
        data.printers.length, 
        data.shares.length
      );

      for (let i = 0; i < maxLength; i++) {
        if (i < data.users.length) pagingdata.push(data.users[i]);
        if (i < data.computers.length) pagingdata.push(data.computers[i]);
        if (i < data.groups.length) pagingdata.push(data.groups[i]);
        if (i < data.printers.length) pagingdata.push(data.printers[i]);
        if (i < data.shares.length) pagingdata.push(data.shares[i]);
      }


      displayTable(currentPage) 

    })
    .catch(error=> {
      console.log(error.message)
      handleError(error)
    })
}