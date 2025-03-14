const form = document.getElementById('search-form');
const inputField = document.getElementById("name");
let loading = createLoading()
// Form submit function
async function search(event) {
  event.preventDefault();
  if (inputField.value == "" || inputField.value == "a" || inputField.value == "c" || inputField.value == "g" || inputField.value == "s" || inputField.value == "p" || inputField.value == "u" ){
    inputField.classList.toggle("error")
    if (document.getElementById("error") == null){
      err = document.createElement("span")
      err.id = err
      err.innerHTML = "Cannot use reseved letter for all search"
      form.appendChild(err)
    }
    form.reset()

    setTimeout(function () {
      inputField.classList.toggle("error")
      form.removeChild(err)
    }, 2000)
    return
  }

  sessionStorage.setItem("previousSearch", inputField.value)

  await determineSearch(inputField.value)


  inputField.style.outline = "none"
  form.reset()



} 


function determineSearch(input) {
  content.innerHTML = ""
  
  content.appendChild(loading)

  let [filterValue, searchValue]= getSearchCriteria(input)

  switch (filterValue) {
    case 'u':{
      getSearch(searchValue, "users")
      break;
    } 
    case 'p': {
      postSearch(searchValue, "printers")
      break;
    }
    case 'c': {
      getSearch(searchValue, "computers")
      break;
    }
    case 's': {
      postSearch(searchValue, "sharedrives")
      break;
    }
    case 'g': {
      getSearch(searchValue, "groups")
      break;
    }
    case 'a': {
      postSearchAll(searchValue, "all")
      break;
    }
    default: {
      postSearchAll(searchValue, "all")
      break;
    }
  }
}


function getPreviousSearch() {
  const input = sessionStorage.getItem("previousSearch")
  if (input == null ) return
  determineSearch(input)
}
getPreviousSearch()


