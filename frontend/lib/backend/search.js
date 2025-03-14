const form = document.getElementById('search-form');
const inputField = document.getElementById("name");

// Form submit function
function search(event) {
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

  let [filterValue, searchValue]= getSearchCriteria(inputField.value)

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

  inputField.style.outline = "none"
  //searchAll(inputField.value);
  form.reset()
} 