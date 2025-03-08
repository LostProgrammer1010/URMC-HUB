const input = document.getElementById('name');

  // Check for when enter key is pressed to submit information
document.getElementById('name').addEventListener('keydown', async function(event) {

    if (event.key == 'Enter') {
      
      if (document.getElementById("name").value == ""){
        document.getElementById("name").style.outline = "1px solid red"
        return
      }

      try {
        document.getElementById("name").style.outline = "none"
        await lookUpUsers(input.value);
      } 
        catch (error) {
          console.error(error)
      }
    }
});



function searchButton() {
  const inputField = document.getElementById("name")

  if (inputField.value != "" ){
    lookUpUsers(inputField.value)
  }
  else {
    document.getElementById("name").style.outline = "1px solid red"
    return

  }


}
