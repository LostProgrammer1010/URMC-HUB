let currentPage = 1
const rowsPerPage = 10
var pagingdata;


async function lookUpPrinter(input) {
    localStorage.setItem("printerPreviousSearch", input)

    console.log(localStorage.getItem("printerPreviousSearch"))

    document.getElementById("loading").style.display = "flex"
  
    document.getElementById("printer").innerHTML = ""
  
    if (input == ""){
      document.getElementById("loading").style.display = "none"
      return
    }
  
    const response = fetch(`http://localhost:8080/printer/search/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: input })
    })
      .then(response => {

        return response.json()
      }) // Parse the JSON response from the server
      .then(data => {


        pagingdata = data

        displayTable(currentPage)
  
      })
      .catch(error=> {
        document.getElementById("loading").style.display = "none"
        handleError(error)
      })
  }

 

  function displayTable(page) {
    localStorage.setItem("printerCurrentPage", String(currentPage))
    document.getElementById("loading").style.display = "none"
    const tableBody = document.getElementById("printer");
    tableBody.innerHTML = "";

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    
    
    if (pagingdata == null) {
      tableBody.innerHTML += `
        <tr>
          <td data-label="Name">No Printers Found</td>
        </tr>
        `
      return
    }  
    const paginatedData = pagingdata.slice(start, end);

    paginatedData.forEach(item => {

      document.getElementById("printer").innerHTML += `
                    <tr>
                      <td data-label="Queue Name">\\\\${item.server}\\${item.queue}</td>
                      <td data-label="IP">${item.ip}</td>
                      <td data-label="IP">${item.model}</td>
                      <td data-label="IP">${item.printProccessor}</td>
                      <td data-label="IP">${item.location}</td>
                      <td data-label="IP">${item.notes}</td>
                    </tr>
          `
    });

    // Update page info
    document.getElementById("page-info").textContent = `Page ${currentPage} of ${Math.ceil(pagingdata.length / rowsPerPage)}`;

    // Enable/Disable buttons based on page number
    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage === Math.ceil(pagingdata.length / rowsPerPage);
  }