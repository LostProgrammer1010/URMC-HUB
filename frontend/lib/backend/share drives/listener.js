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
