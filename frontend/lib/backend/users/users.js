const inputField = document.getElementById('name');

let currentPage = 1
const rowsPerPage = 10
var pagingdata;


async function getPreviousSearch() {
  if (localStorage.getItem("usersCurrentPage") == null) return
  currentPage = Number(localStorage.getItem("usersCurrentPage"))
  await lookUpUsers(localStorage.getItem("usersPreviousSearch"))
  inputField.placeholder = `Previous Search "${localStorage.getItem("usersPreviousSearch")}"`

}

getPreviousSearch()


async function lookUpUsers(input) {
  localStorage.setItem("usersPreviousSearch", input)

  const loading = document.getElementById("loading")

  loading.style.display = "flex"

  fetch(`http://localhost:8080/users/search/${input}`)
    .then(response => response.json()) 
    .then(data => {
      pagingdata = data


      document.getElementById("name").style.outline = ""
      displayTable(currentPage)

    })
    .catch(error => {
      loading.style.display = "none"
      //alert("Server not running. Please start server located here: File_path")
      throw new Error(error)
    })
}

function pullUpUser(row) {
  const username = row.children[1].innerHTML
  localStorage.setItem("username", username)
  window.location.href = "../pages/user.html"
}

function displayTable(page) {
  localStorage.setItem("usersCurrentPage", String(currentPage))
  loading.style.display = "none"
  const tableBody = document.getElementById("users");
  tableBody.innerHTML = "";

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  
  
  if (pagingdata == null) {
    document.getElementById("page-info").textContent = `Page 1 of 1`;
    tableBody.innerHTML += `
      <tr>
        <td data-label="Name">No Users Found</td>
        <td data-label="Username">No Users Found</td>
        <td data-label="OU">No Users Found</td>
      </tr>
      `
    return
  }  

  const paginatedData = pagingdata.slice(start, end);


  paginatedData.forEach(user => {

    tableBody.innerHTML += `
      <tr onclick="pullUpUser(this)">
        <td data-label="Name">${user.name}</td>
        <td data-label="Username">${user.username}</td>
        <td data-label="OU">${user.ou}</td>
      </tr>
      `
  });

  // For paging
  document.getElementById("page-info").textContent = `Page ${currentPage} of ${Math.ceil(pagingdata.length / rowsPerPage)}`;
  document.getElementById("prev-button").disabled = currentPage === 1;
  document.getElementById("next-button").disabled = currentPage === Math.ceil(pagingdata.length / rowsPerPage);
}

function prevPage() {
  if (pagingdata == null) {
    document.getElementById("name").style.outline = "1px solid red"
    return
  }
  if (currentPage > 1) {
      currentPage--;
      displayTable(currentPage);
  }
}

function nextPage() {
  if (pagingdata == null) {
    document.getElementById("name").style.outline = "1px solid red"
    return
  }
  if (currentPage < Math.ceil(pagingdata.length / rowsPerPage)) {
      currentPage++;
      displayTable(currentPage);
  }
}


