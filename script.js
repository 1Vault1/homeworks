function Student(name, marks) {
  this.name = name;
  this.marks = marks;
}

Student.prototype.getAvarageMark = function () {
  let avarageMark = (this.marks.reduce((sum, num) => sum + num) / this.marks.length).toFixed(1);
  return `${this.name} - ${avarageMark}`
}

const students = [
  new Student('Student 1', [10, 9, 8, 0, 10]),
  new Student('Student 2', [10, 0, 8, 0, 3, 4])
];

// const john = new Student('John', [10, 10, 9, 9]);
// const bob = new Student('Bob', [10, 5, 5, 5, 10, 5, 8]);

// console.log(john.getAvarageMark());
// console.log(bob.getAvarageMark())

console.log(students[0].getAvarageMark())
console.log(students[1].getAvarageMark())