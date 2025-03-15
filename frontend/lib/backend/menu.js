// Handles all of the menu functionality
function openMenu(event, group) {
  event.preventDefault()
  customMenu = document.getElementById('customMenu');
  customMenu.style.display = 'block';  // Show the custom menu
  customMenu.style.left = `${event.pageX}px`;  // Position the menu at mouse X
  customMenu.style.top = `${event.pageY}px`;
  customMenu.setAttribute("hidden", group.children[0].innerHTML)
}


document.addEventListener('click', function(event) {
  if (!customMenu.contains(event.target)) {
    customMenu.style.display = 'none';  // Hide the menu if the click is outside
  }
});


function copyGroupName() {
  let menu = document.getElementById("customMenu")
  group = menu.getAttribute("hidden")
  console.log(group)
}