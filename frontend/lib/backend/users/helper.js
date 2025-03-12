const inputField = document.getElementById('name');
const form = document.getElementById('search-form');

// Form submit function
function search(event) {
  event.preventDefault();
  if (inputField.value == ""){
    inputField.style.outline = "1px solid red"
    form.reset()
    return
  }
  inputField.style.outline = "none"
  lookUpUsers(inputField.value);
  form.reset()
} 


// Gets the previous search on that page
async function getPreviousSearch() {
  if (localStorage.getItem("usersCurrentPage") == null) return
  currentPage = Number(localStorage.getItem("usersCurrentPage"))
  await lookUpUsers(localStorage.getItem("usersPreviousSearch")).catch(error => console.log(error.message))
  inputField.placeholder = `Previous Search "${localStorage.getItem("usersPreviousSearch")}"`

}

// Go back a page
function prevPage() {
  if (pagingdata == null) {
    return
  }
  if (currentPage > 1) {
      currentPage--;
      displayTable(currentPage);
  }
}

// Go Forward a page
function nextPage() {
  if (pagingdata == null) {
    return
  }
  if (currentPage < Math.ceil(pagingdata.length / rowsPerPage)) {
      currentPage++;
      displayTable(currentPage);
  }
}

if (localStorage.getItem("domain") == "urmc-sh") {
  document.getElementById("URcheckbox").checked = false
} else {
  document.getElementById("URcheckbox").checked = true
}

getPreviousSearch()
