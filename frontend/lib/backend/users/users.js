let currentPage = 1
const rowsPerPage = 10
var pagingdata;



// GET Request to server to get all of the users that match the search
async function lookUpUsers(input) {
  console.log(input)
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
      handleError(error)

    })
}

// Sends the user to user page when a user is pressed
function pullUpUser(row) {
  const username = row.children[1].innerHTML
  localStorage.setItem("username", username)
  window.location.href = "../pages/user.html"
}

// Display the users in a paged format
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



