function Student(name, marks) {
  this.name = name;
  this.marks = marks;
}

Student.prototype.avarageMark = function () {
  this.marks = (this.marks.reduce((sum, num) => sum + num) / this.marks.length).toFixed(1);
  return `${this.name} - ${this.marks}`
}

const students = [
  new Student('Student 1', [10, 9, 8, 0, 10]),
  new Student('Student 2', [10, 0, 8, 0, 3, 4])
];

// const john = new Student('John', [10, 10, 9, 9]);
// const bob = new Student('Bob', [10, 5, 5, 5, 10, 5, 8]);

// console.log(john.avarageMark());
// console.log(bob.avarageMark())

console.log(students[0].avarageMark())
console.log(students[1].avarageMark())