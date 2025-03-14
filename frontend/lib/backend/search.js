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