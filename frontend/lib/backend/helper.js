
const loading = document.getElementById("loading");





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
    default: return ['a', splitSearch.slice(0).join(" ")]
  }
}


function getSearch(searchValue, filter) {
  currentPage = 1
  const loading = document.getElementById("loading")
  domain = "urmc-sh"
  /*
  if (document.getElementById("URcheckbox").checked) {
    domain = "ur"
  } else {
    domain = "urmc-sh"
  }
  */
  sessionStorage.setItem("domain", domain)
  loading.style.display = "flex"
    fetch(`http://localhost:8080/search/${filter}/${domain}/${searchValue}`)
    .then(response => response.json()) 
    .then(data => {
      pagingdata = data


      inputField.style.outline = ""
      displayTable(currentPage)

    })
    .catch(error => {
      loading.style.display = "none"
      handleError(error)

    })
}
