const inputField = document.getElementById('name');
const form = document.getElementById('search-form');


async function getPreviousSearch() {
  currentPage = Number(localStorage.getItem("sharedrivesCurrentPage"))
  await lookUpShareDrive(localStorage.getItem("sharedrivesPreviousSearch"))
  inputField.value = localStorage.getItem("sharedrivesPreviousSearch")

}


function search(event) {
  event.preventDefault();
  if (inputField.value == ""){
    inputField.style.outline = "1px solid red"
    form.reset()
    return
  }
  inputField.style.outline = "none"
  lookUpShareDrive(inputField.value);
  form.reset()
} 


function prevPage() {
  if (pagingdata == null) {
    return
  }
  if (currentPage > 1) {
      currentPage--;
      displayTable(currentPage);
  }
}

function nextPage() {
  if (pagingdata == null) {
    return
  }
  if (currentPage < Math.ceil(pagingdata.length / rowsPerPage)) {
      currentPage++;
      displayTable(currentPage);
  }
}

getPreviousSearch()
