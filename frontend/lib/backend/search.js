const form = document.getElementById('search-form');
const inputField = document.getElementById("name");

// Form submit function
function search(event) {
  event.preventDefault();

  if (inputField.value == ""){
    inputField.style.outline = "1px solid red"
    form.reset()
    return
  }

  let [filterValue, searchValue]= getSearchCriteria(inputField.value)

  switch (filterValue) {
    case 'u':{
      getSearch(searchValue, "users")
      break;
    } 
    case 'p': {
      getSearch(searchValue, "printers")
      break;
    }
    case 'c': {
      getSearch(searchValue, "computers")
      break;
    }
    case 's': {
      getSearch(searchValue, "sharedrives")
      break;
    }
    case 'g': {
      getSearch(searchValue, "groups")
      break;
    }
    case 'a': {
      getSearch(searchValue, "all")
      break;
    }
    default: {
      getSearch(searchValue, "all")
      break;
    }
  }

  inputField.style.outline = "none"
  //searchAll(inputField.value);
  form.reset()
} 