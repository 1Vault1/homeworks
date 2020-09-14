function Hamburger(size) {
  this.size = size;
  this.toppings = [];
}

Hamburger.SIZE_SMALL = {
  price: 50,
  callories: 20,
}

Hamburger.SIZE_MIDDLE = {
  price: 75,
  callories: 30,
}

Hamburger.SIZE_BIG = {
  price: 100,
  callories: 40,
}

Hamburger.TOPPING_CHEESE = {
  price: 10,
  callories: 20,
}

Hamburger.TOPPING_SALAD = {
  price: 20,
  callories: 5,
}

Hamburger.TOPPING_POTATO = {
  price: 20,
  callories: 5,
}

Hamburger.TOPPING_SAUCE = {
  price: 15,
  callories: 0,
}

Hamburger.TOPPING_MAYO = {
  price: 20,
  callories: 5,
}

Hamburger.prototype.addTopping = function (topping) {
  return this.toppings.push(topping);
}

Hamburger.prototype.getPrice = function () {
  let toppingPrice = this.toppings.reduce((sum, topping) => sum + topping.price, 0);
  let totalPrice = this.size.price + toppingPrice;

  return totalPrice;
}

Hamburger.prototype.getCallories = function () {
  let toppingCallories = this.toppings.reduce((sum, topping) => sum + topping.callories, 0);
  let totalCallories = this.size.callories + toppingCallories;

  return totalCallories;
}

const hamburger = new Hamburger(Hamburger.SIZE_MIDDLE);

hamburger.addTopping(Hamburger.TOPPING_POTATO);
hamburger.addTopping(Hamburger.TOPPING_MAYO);

console.log('Price with sauce: ' + hamburger.getPrice());
console.log('Callories with sauce: ' + hamburger.getCallories());