const inputField = document.getElementById('name');

let currentPage = 1
const rowsPerPage = 10
var pagingdata;


async function getPreviousSearch() {
  currentPage = Number(localStorage.getItem("usersCurrentPage"))
  await lookUpUsers(localStorage.getItem("usersPreviousSearch"))
  inputField.value = localStorage.getItem("usersPreviousSearch")

}

getPreviousSearch()


async function lookUpUsers(input) {
  localStorage.setItem("usersPreviousSearch", input)

  document.getElementById("loading").style.display = "flex"

  document.getElementById("users").innerHTML = ""

  if (input == ""){
    document.getElementById("loading").style.display = "none"
    return
  }

  const response = fetch(`http://localhost:8080/users/search/${input}`)
    .then(response => response.json()) // Parse the JSON response from the server
    .then(data => {
      pagingdata = data

      displayTable(currentPage)

    })
    .catch(error=> {
      document.getElementById("loading").style.display = "none"
      alert("Server not running. Please start server located here: File_path")
      throw new Error("Server not running")
    })
}

function pullUpUser(row) {
  const username = row.children[1].innerHTML
  console.log(username)
  localStorage.setItem("username", username)
  window.location.href = "../pages/user.html"
}

function displayTable(page) {
  localStorage.setItem("usersCurrentPage", String(currentPage))
  document.getElementById("loading").style.display = "none"
  const tableBody = document.getElementById("users");
  tableBody.innerHTML = "";

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  
  
  if (pagingdata == null) {
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


  paginatedData.forEach(element => {
    splitdata = element.split("|")

    document.getElementById("users").innerHTML += `
      <tr onclick="pullUpUser(this)">
        <td data-label="Name">${splitdata[1]}</td>
        <td data-label="Username">${splitdata[0]}</td>
        <td data-label="OU">${splitdata[2]}</td>
      </tr>
      `
  });

  // Update page info
  document.getElementById("page-info").textContent = `Page ${currentPage} of ${Math.ceil(pagingdata.length / rowsPerPage)}`;

  // Enable/Disable buttons based on page number
  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = currentPage === Math.ceil(pagingdata.length / rowsPerPage);
}

function prevPage() {
  if (currentPage > 1) {
      currentPage--;
      displayTable(currentPage);
  }
}

function nextPage() {
  if (currentPage < Math.ceil(pagingdata.length / rowsPerPage)) {
      currentPage++;
      displayTable(currentPage);
  }
}

