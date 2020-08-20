const calculator = createCalculator(10);

function createCalculator(number) {
  let result = number;

  return {
    sum: (number) => console.log(result += number),
    sub: (number) => console.log(result -= number),
    mult: (number) => console.log(result *= number),
    div: (number) => console.log(result /= number),
    set: (number) => console.log(result = number),
  }
}

// function createCalculator(number) {
//   let result = number;

//   return {
//     sum: function (number) {
//       console.log(result += number);
//     },
//     sub: function (number) {
//       console.log(result -= number);
//     },
//     mult: function (number) {
//       console.log(result *= number);
//     },
//     div: function (number) {
//       console.log(result /= number);
//     },
//     set: function (number) {
//       console.log(result = number);
//     },
//   }
// }

calculator.sum(5);
calculator.mult(10);
calculator.sub(40);
calculator.div(10);
calculator.set(100);