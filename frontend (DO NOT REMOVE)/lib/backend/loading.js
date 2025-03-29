function createLoading() {
  let loading = document.createElement("div")
  loading.classList = "loading"
  loading.id = "loading"

  circle1 = document.createElement("div")
  circle1.classList = "circle"
  circle1.id = "one"

  circle2 = document.createElement("div")
  circle2.classList = "circle"
  circle2.id = "two"

  circle3 = document.createElement("div")
  circle3.classList = "circle"
  circle3.id = "two"

  loading.appendChild(circle1)
  loading.appendChild(circle2)
  loading.appendChild(circle3)

  return loading
}
