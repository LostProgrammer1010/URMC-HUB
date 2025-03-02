let currentPage = 1
const rowsPerPage = 10
var pagingdata;


const input = document.getElementById('name');

  // Check for when enter key is pressed to submit information
document.getElementById('name').addEventListener('keydown', async function(event) {

    if (event.key == 'Enter') {
      currentPage = 1
        
      try {
        await lookUpShareDrive(input.value);
      } 
        catch (error) {
          console.error(error)
      }
    }
});



async function lookUpShareDrive(input) {

    document.getElementById("loading").style.display = "flex"
  
    document.getElementById("sharedrives").innerHTML = ""
  
    if (input == ""){
      document.getElementById("loading").style.display = "none"
      return
    }
  
    const response = fetch(`http://localhost:8080/sharedrive/search/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: input })
    })
      .then(response => response.json()) // Parse the JSON response from the server
      .then(data => {

        pagingdata = data

        displayTable(1)
  
      })
      .catch(error=> {
        document.getElementById("loading").style.display = "none"
        //alert("Server not running. Please start server located here: File_path")

        throw new Error(error)
      })
  }

 

  function displayTable(page) {
    document.getElementById("loading").style.display = "none"
    const tableBody = document.getElementById("sharedrives");
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
    console.log(pagingdata)


    paginatedData.forEach(item => {
      driveList = ""
      item.Drives.forEach(element => {
          driveList += `<br>${element.path} <br><br>`
      })

      document.getElementById("sharedrives").innerHTML += `
                    <tr>
                      <td data-label="Name">${item.group}</td>
                      <td data-label="Username" class="drives">${driveList}</td>
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

// Initial load
displayTable(currentPage);
  

