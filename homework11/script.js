const todoInputEl = document.getElementById('todoInputEl');
const addButtonEl = document.getElementById('addButton');
const todoListEl = document.getElementById('todoList');
let todoListItem;
let removeButton;

addButtonEl.addEventListener('click', onAddButtonElClick);
todoListEl.addEventListener('click', onTodoListElClick);

function onAddButtonElClick() {
  createListItem(todoInputEl.value);
  clearInput();
  createRemoveButton();
}

function createListItem(value) {
  todoListItem = document.createElement('li');
  todoListItem.className = 'todo-list-item';
  todoListItem.textContent = value;

  if (value !== '') {
    todoListEl.append(todoListItem);
  }
}

function clearInput() {
  todoInputEl.value = '';
}

function createRemoveButton() {
  removeButton = document.createElement('button');
  removeButton.className = 'remove-btn';
  removeButton.textContent = 'X';
  todoListItem.append(removeButton);

  removeButton.addEventListener('click', removeTodoListItem);
}

function onTodoListElClick(e) {
  if (e.target.classList.contains('todo-list-item')) {
    e.target.classList.toggle('done');
  }
}

function removeTodoListItem(e) {
  if (e.target.classList.contains('remove-btn')) {
    e.target.closest('.todo-list-item').remove();
  }
}