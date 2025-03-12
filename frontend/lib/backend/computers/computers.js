let currentPage = 1
const rowsPerPage = 10
var pagingdata;

async function lookUpComputers(input) {
  currentPage = 1

  localStorage.setItem("computerPreviousSearch", input)

  document.getElementById("loading").style.display = "flex"

  document.getElementById("computers").innerHTML = ""

  if (input == ""){
    document.getElementById("loading").style.display = "none"
    return
  }

  const response = fetch(`http://localhost:8080/computers/search/${input}`)
    .then(response => response.json()) // Parse the JSON response from the server
    .then(data => {
      pagingdata = data

      console.log(data)
      displayTable(currentPage)

    })
    .catch(error=> {
      document.getElementById("loading").style.display = "none"
      handleError(error)
    })
}

function pullUpComputer(row) {
  const computername = row.children[0].innerHTML
  console.log(computername)
  localStorage.setItem("computername", computername)
  window.location.href = "../pages/computer.html"
}

function displayTable(page) {
  document.getElementById("loading").style.display = "none"
  const tableBody = document.getElementById("computers");
  tableBody.innerHTML = "";

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  
  
  if (pagingdata == null) {
    tableBody.innerHTML += `
      <tr>
        <td data-label="Name">No Computers Found</td>
        <td data-label="OU">No Computers Found</td>
      </tr>
      `
    return
  }  
  const paginatedData = pagingdata.slice(start, end);


  paginatedData.forEach(element => {
    
    document.getElementById("computers").innerHTML += `
      <tr onclick="pullUpComputer(this)">
        <td data-label="Name">${element.name}</td>
        <td data-label="OU">${element.ou}</td>
      </tr>
      `
  });

  // Update page info
  document.getElementById("page-info").textContent = `Page ${currentPage} of ${Math.ceil(pagingdata.length / rowsPerPage)}`;

  // Enable/Disable buttons based on page number
  document.getElementById("prev-button").disabled = currentPage === 1;
  document.getElementById("next-button").disabled = currentPage === Math.ceil(pagingdata.length / rowsPerPage);
}


