const body = document.getElementById("body");

var currentPage = 1
var rowsPerPage = 10
var pagingdata;


// Display the users in a paged format
function displayTable(page) {
  body.innerHTML = "";
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  
  
  if (pagingdata == null) {
    document.getElementById("page-info").textContent = `Page 1 of 1`;
    row = document.createElement("div")
    row.classList.add("row")
    span = document.createElement("span")
    span.innerHTML = "No Results Found"
    row.appendChild(span)
    body.appendChild(row)
    return
  }  

  const paginatedData = pagingdata.slice(start, end);


  paginatedData.forEach(item => {

    switch (item.type) {
      case "user":
        displayUser(item, body)
        break
      case "computer":
        displayComputer(item, body)
        break
      case "printer":
        displayPrinter(item, body)
        break
      case "sharedrive":
        displayShareDrive(item, body)
        break
      case "group":
        displayGroup(item, body)
        break
      case "all":
      default:
        console.error("Not a correct item type")
    }
  });

  // For paging
  document.getElementById("page-info").textContent = `Page ${currentPage} of ${Math.ceil(pagingdata.length / rowsPerPage)}`;
  document.getElementById("prev-button").disabled = currentPage === 1;
  document.getElementById("next-button").disabled = currentPage === Math.ceil(pagingdata.length / rowsPerPage);
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