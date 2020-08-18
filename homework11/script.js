const todoInputEl = document.getElementById('todoInputEl');
const addButtonEl = document.getElementById('addButton');
const todoListEl = document.getElementById('todoList');
let todoListItem;

addButtonEl.addEventListener('click', onAddButtonElClick);
todoListEl.addEventListener('click', onTodoListElClick);

function onAddButtonElClick() {
  createListItem(todoInputEl.value);
  clearInput();
}

function createListItem(value) {
  todoListItem = document.createElement('li');
  todoListItem.className = 'todo-list-item';
  todoListItem.textContent = value;

  if (value !== '') {
    todoListEl.append(todoListItem);
  }

  createRemoveButton();
}

function clearInput() {
  todoInputEl.value = '';
}

function createRemoveButton() {
  let removeButton = document.createElement('button');
  removeButton.className = 'remove-btn';
  removeButton.textContent = 'X';
  todoListItem.append(removeButton);
}

function onTodoListElClick(e) {
  if (e.target.classList.contains('todo-list-item')) {
    e.target.classList.toggle('done');
  }

  if (e.target.classList.contains('remove-btn')) {
    e.target.closest('.todo-list-item').remove();
  }
}
