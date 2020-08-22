const calculator = createCalculator(10);

function createCalculator(number) {
  let result = number;

  return {
    sum: (number) => result += number,
    sub: (number) => result -= number,
    mult: (number) => result *= number,
    div: (number) => result /= number,
    set: (number) => result = number,
  }
}

// function createCalculator(number) {
//   let result = number;

//   return {
//     sum: function (number) {
//       return result += number
//     },
//     sub: function (number) {
//       return result -= number
//     },
//     mult: function (number) {
//       return result *= number
//     },
//     div: function (number) {
//       return result /= number
//     },
//     set: function (number) {
//       return result = number;
//     },
//   }
// }

console.log(calculator.sum(5));
console.log(calculator.mult(10));
console.log(calculator.sub(40));
console.log(calculator.div(10));
console.log(calculator.set(100));