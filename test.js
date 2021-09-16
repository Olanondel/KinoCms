let cart = [{"row":1,"place":1},{"row":1,"place":3},{"row":1,"place":6}]

function el(el) {
  return !(el.place === 3 && el.row === 1)
}

console.log(
  cart.filter(el)
)