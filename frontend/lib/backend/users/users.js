let currentPage = 1
const rowsPerPage = 10
var pagingdata;



// GET Request to server to get all of the users that match the search
async function lookUpUsers(input) {
  currentPage = 1
  localStorage.setItem("userPreviousSearch", input)
  const loading = document.getElementById("loading")
  domain = "urmc-sh"
  if (document.getElementById("URcheckbox").checked) {
    domain = "ur"
  } else {
    domain = "urmc-sh"
  }
  sessionStorage.setItem("domain", domain)
  loading.style.display = "flex"
    fetch(`http://localhost:8080/users/search/${domain}/${input}`)
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
  sessionStorage.setItem("username", username)
  window.location.href = "../pages/user.html"
  
}

// Display the users in a paged format
function displayTable(page) {
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

    var className;
    console.log(user.offboarded)
    if (user.disabled) {
      className = "disable"
    }else if (user.offboarded) {
      className = "offboarded"
      
    } else {
      className = "normal"
    }


    tableBody.innerHTML += `
      <tr class="${className}" onclick="pullUpUser(this)">
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



