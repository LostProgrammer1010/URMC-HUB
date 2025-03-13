let currentPage = 1
const rowsPerPage = 10
var pagingdata;

async function lookUpGroup(input) {
  currentPage = 1

  localStorage.setItem("groupPreviousSearch", input)

  document.getElementById("loading").style.display = "flex"

  document.getElementById("groups").innerHTML = ""

  if (input == ""){
    document.getElementById("loading").style.display = "none"
    return
  }

  const response = fetch(`http://localhost:8080/search/groups/${input}`)
    .then(response => response.json()) // Parse the JSON response from the server
    .then(data => {
      pagingdata = data

      console.log(data)
      displayTable(currentPage)

    })
    .catch(error=> {
      document.getElementById("loading").style.display = "none"
      console.log(error)
      handleError(error)
    })
}

function pullUpGroup(row) {
  const computername = row.children[0].innerHTML
  sessionStorage.setItem("groupname", computername)
  window.location.href = "../pages/group.html"
}

function displayTable(page) {
  document.getElementById("loading").style.display = "none"
  const tableBody = document.getElementById("groups");
  tableBody.innerHTML = "";

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  
  
  if (pagingdata == null) {
    tableBody.innerHTML += `
      <tr>
        <td data-label="Name">No Group Found</td>
        <td data-label="OU">No Group Found</td>
      </tr>
      `
    return
  }  
  const paginatedData = pagingdata.slice(start, end);


  paginatedData.forEach(group => {
    
    document.getElementById("groups").innerHTML += `
      <tr onclick="pullUpGroup(this)">
        <td data-label="Name">${group.name}</td>
        <td data-label="OU">${group.ou}</td>
      </tr>
      `
  });

  // Update page info
  document.getElementById("page-info").textContent = `Page ${currentPage} of ${Math.ceil(pagingdata.length / rowsPerPage)}`;

  // Enable/Disable buttons based on page number
  document.getElementById("prev-button").disabled = currentPage === 1;
  document.getElementById("next-button").disabled = currentPage === Math.ceil(pagingdata.length / rowsPerPage);
}


