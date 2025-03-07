function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.classList.toggle("drag-animation")
  }
  
  function dropelement(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }


  function edit(button) {
    let fields = document.getElementsByClassName("field")

    
    for (let i=0; i < fields.length; i++){

        if (fields[i].getAttribute("contenteditable") == "false") {
            button.innerHTML = "Save"
            fields[i].setAttribute("contenteditable", "true");
        }
        else {
            button.innerHTML = "Edit"
            fields[i].setAttribute("contenteditable", "false");
        }
        fields[i].classList.toggle("edit")
    }

  }