function copyAttr(attrField) {
    
    let el = document.getElementsByClassName("copied-container")[0]
    navigator.clipboard.writeText(attrField.innerHTML)
    .then(function () {
        el.style.display = "flex"
    })
    .catch(function () {
        el.style.display = "none"
    })

    setTimeout(() => {
        el.style.display = "none"
    }, 1000)
}