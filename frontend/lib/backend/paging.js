const content = document.getElementById("content");

var currentPage = 1
var rowsPerPage = 10
var pagingdata;


// Display the users in a paged format
function displayTable(page) {
  content.innerHTML = ""
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  
  
  if (pagingdata == null) {
    document.getElementById("page-info").textContent = `Page 1 of 1`;
    row = document.createElement("div")
    row.classList.add("row")
    span = document.createElement("span")
    span.innerHTML = "No Results Found"
    row.appendChild(span)
    content.appendChild(row)
    return
  }  

  const paginatedData = pagingdata.slice(start, end);


  paginatedData.forEach(item => {

    switch (item.type) {
      case "user":
        displayUser(item, content)
        break
      case "computer":
        displayComputer(item, content)
        break
      case "printer":
        displayPrinter(item, content)
        break
      case "sharedrives":
        displayShareDrive(item, content)
        break
      case "group":
        displayGroup(item, content)
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


function getSearchCriteria(input) {
  input = input.replace(/\s+/g, ' ').trim();

  splitSearch = input.split(" ")

  switch (splitSearch[0]) {
    case 'u': return ['u', splitSearch.slice(1).join(" ")]
    case 'p': return ['p', splitSearch.slice(1).join(" ")]
    case 'c': return ['c', splitSearch.slice(1).join(" ")]
    case 's': return ['s', splitSearch.slice(1).join(" ")]
    case 'g': return ['g', splitSearch.slice(1).join(" ")]
    case 'a': return ['a', splitSearch.slice(1).join(" ")]
    default: return ['a', splitSearch.join(" ")]
  }
}

