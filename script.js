const STUDENTS_ITEM_CLASS = 'row';
const VISIBLE_ERROR_CLASS = 'visible';
const DELETE_BTN_CLASS = 'remove-btn';
const STORAGE_KEY = 'studentsListEl';

const addButtonEl = document.getElementById('addButton');
const studentsListEl = document.getElementById('studentsList');
const studentsInputName = document.getElementById('studentsInputName');
const studentsInputMarks = document.getElementById('studentsInputMarks');
const avarageMarkAll = document.getElementById('avarageMarkAll');
const studentsItemTemplate = document.getElementById('studentsItemTemplate').innerHTML;

let studentsList = [];
let studentsMarksArr = [];
let allMarks = [];
let studentsAvarageMark;

addButtonEl.addEventListener('click', onAddButtonEl);
studentsListEl.addEventListener('click', onStudentsListEl);

init();

function onAddButtonEl(e) {
  e.preventDefault();

  submitForm();
}

function onStudentsListEl(e) {
  switch (true) {
    case e.target.classList.contains(DELETE_BTN_CLASS):
      deleteStudent(e.target.closest('.' + STUDENTS_ITEM_CLASS));
  }
}

function init() {
  restoreData();

  renderStudentsList(studentsList);
}

function submitForm() {
  if (isValidForm() && isStudentsInputMarksValid()) {
    getStudentsInputMarksArr();
    studentsAvarageMark = getAvarage(studentsMarksArr);

    const studentObj = {
      id: Date.now(),
      name: studentsInputName.value,
      marks: studentsMarksArr,
      avarageMark: studentsAvarageMark,
    };

    groupAvarageMark();

    studentsMarksArr = [];

    addStudent(studentObj);
    resetForm();
  }
}

function addStudent(student) {
  studentsList.push(student);

  saveDate();
  renderStudent(student);
}

function renderStudent(student) {
  const html = studentsItemTemplate
    .replace('{{id}}', student.id)
    .replace('{{name}}', student.name)
    .replace('{{marks}}', student.marks)
    .replace('{{avarageMark}}', student.avarageMark);

  studentsListEl.insertAdjacentHTML('beforeend', html);
}

function renderStudentsList(studentsList) {
  studentsList.forEach((item) => renderStudent(item));
}

function deleteStudent(studentEl) {
  const id = +studentEl.dataset.id;

  studentsList = studentsList.filter((item) => item.id !== id);

  saveDate();

  studentEl.remove();
}

function isValidForm() {
  if (studentsInputName.value && studentsInputMarks.value) {
    return studentsInputName.value && studentsInputMarks.value;
  }
  alert('all fialds');
}

function isStudentsInputMarksValid() {
  let value = studentsInputMarks.value.split(',').find(isNaN);

  if (!value) {
    return studentsInputMarks.value;
  }

  alert('numbers');
}

function getStudentsInputMarksArr() {
  let valueInput = studentsInputMarks.value.split(',');
  let number;

  for (let i = 0; i <= valueInput.length; i++) {
    number = parseInt(valueInput[i]);
    if (!isNaN(number)) {
      studentsMarksArr.push(number);
    }
  }

  return studentsMarksArr;
}

function groupAvarageMark() {
  allMarks = allMarks.concat(studentsMarksArr);

  avarageMarkAll.textContent = getAvarage(allMarks);
}

function getAvarage(arr) {
  return arr.reduce((sum, num) => sum + num) / arr.length;
}

function resetForm() {
  studentsInputName.value = '';
  studentsInputMarks.value = '';
}

function saveDate() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(studentsList));
}

function restoreData() {
  const data = localStorage.getItem(STORAGE_KEY);

  studentsList = data ? JSON.parse(data) : [];
}