const waitingMessage = document.getElementById('waitingMessage');

function removeLoading() {
  if(waitingMessage != null) {
    waitingMessage.remove()
  }


}


function displayNoImage(image) {
  if(waitingMessage != null) {
    waitingMessage.remove()
  }
  image.remove()

}


function toggleFullscreen(img) {
  img.classList.toggle("larger")
}

function test() {
  const imageElements = document.querySelectorAll("img")

  imageElements.forEach(img => {
    if (img.id != "nav-img"){
      img.onerror = function() {
        displayNoImage(this)
      }
      img.onclick = function() {
        toggleFullscreen(this)
      }
      img.onload = function() {
        removeLoading();
      }
    }
  })


}

test()
