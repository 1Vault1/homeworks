const todoInputEl = document.getElementById('todoInputEl');
const addButtonEl = document.getElementById('addButton');
const todoListEl = document.getElementById('todoList');

addButtonEl.addEventListener('click', createListItem);

function createListItem() {
  const todoListItem = document.createElement('li');

  if (todoInputEl.value !== '') {
    todoListEl.append(todoListItem);
  }

  todoListItem.className = 'todo-list-item';
  todoListItem.textContent = todoInputEl.value;
  todoInputEl.value = '';
}


