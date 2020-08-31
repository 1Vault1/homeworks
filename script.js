function Calculator(baseValue) {
  this.baseValue = baseValue;
  let expretion = this.baseValue;

  this.sum = function (number) {
    expretion += ' + ' + number;

    return this.baseValue += number
  };

  this.sub = function (number) {
    expretion += ' - ' + number;

    return this.baseValue -= number
  };

  this.mult = function (number) {
    expretion += ' * ' + number;

    return this.baseValue *= number
  };

  this.div = function (number) {
    expretion += ' / ' + number;

    return this.baseValue /= number
  };

  this.set = function (number) {
    return this.baseValue = number;
  };

  this.getResult = function () {
    return `${expretion} = ${this.baseValue}`
  }
}

const calculator = new Calculator(10);

console.log(calculator.sum(5));
console.log(calculator.mult(10));
console.log(calculator.sub(40));
console.log(calculator.div(10));
console.log(calculator.getResult());
console.log(calculator.set(100));