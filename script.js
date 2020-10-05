const ITEM_CLASS = 'item';
const REMOVE_BTN_CLASS = 'remove-btn';
const TEXTAREA_CLASS = 'textarea';

const URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers';

const addBtnEl = document.getElementById('addBtn');
const stickerTemplate = document.getElementById('stickerTemplate').innerHTML;
const textareaEl = document.getElementsByClassName('textarea');
const listItemsEl = document.getElementById('listItems');

let itemsList = [];

addBtnEl.addEventListener('click', onAddBtn);
listItemsEl.addEventListener('click', onlistItemsEl);
listItemsEl.addEventListener('change', onChangelistItemsEl);

init();

function init() {
  getItems();
}

function onAddBtn() {
  addItem();
}

function onlistItemsEl(e) {
  switch (true) {
    case e.target.classList.contains(REMOVE_BTN_CLASS):
      removeItem(e.target.closest('.' + ITEM_CLASS).dataset.id);
      break;
  }
}

function onChangelistItemsEl(e) {
  switch (true) {
    case e.target.classList.contains(TEXTAREA_CLASS):
      findItem(e.target.closest('.' + ITEM_CLASS).dataset.id);
      break;
  }
}

function getItems() {
  return fetch(URL)
    .then((res) => res.json())
    .then((data) => itemsList = data)
    .then(renderItems);
}

function renderItems(list) {
  listItemsEl.innerHTML = list.map(
    (item) => stickerTemplate
      .replace('{{id}}', item.id)
      .replace('{{description}}', item.description)
  ).join('');
}

function addItem() {
  const item = {
    description: '',
  };

  fetch(URL, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((res) => res.json())
    .then((data) => {
      itemsList.push(data);
      renderItems(itemsList);
    });
}

function findItem(id) {
  const item = itemsList.find((el) => el.id == id);

  updateTextarea(item);
}

function updateTextarea(item) {
  for (let i = 0; i < textareaEl.length; i++) {
    item.description = textareaEl[i].value;
  }

  fetch(`${URL}/${item.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });

  itemsList = itemsList.map((el) => (el.id != item.id ? el : item));

  renderItems(itemsList);
}

function removeItem(id) {
  fetch(`${URL}/${id}`, {
    method: 'DELETE',
  });

  itemsList = itemsList.filter((item) => item.id != id);

  renderItems(itemsList);
}
