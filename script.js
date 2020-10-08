$(() => {
  const ITEM_CLASS = 'item';
  const REMOVE_BTN_CLASS = 'remove-btn';
  const TEXTAREA_CLASS = 'textarea';

  const URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers';

  const $addBtnEl = $('#addBtn');
  const $stickerTemplate = $('#stickerTemplate').html();
  const $listItemsEl = $('#listItems');

  let itemsList = [];

  $addBtnEl.on('click', onAddBtn);
  $listItemsEl.on('click', '.' + REMOVE_BTN_CLASS, onRemoveBtnClick);
  $listItemsEl.on('change', '.' + TEXTAREA_CLASS, onChangelistItemsEl);

  init();

  function init() {
    getItems();
  }

  function onAddBtn() {
    addItem();
  }

  function onRemoveBtnClick() {
    const id = $(this).closest('.' + ITEM_CLASS).data('id');

    removeItem(id);
  }

  function onChangelistItemsEl() {
    updateTextarea(
      $(this).closest('.' + ITEM_CLASS).data('id'),
      $(this).data('name'),
      $(this).val()
    );
  }

  function getItems() {
    return fetch(URL)
      .then((res) => res.json())
      .then((data) => itemsList = data)
      .then(renderItems);
  }

  function renderItems(list) {
    $listItemsEl.html(
      list.map((item) => $stickerTemplate
        .replace('{{id}}', item.id)
        .replace('{{description}}', item.description)
      ).join(''));
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

  function updateTextarea(id, name, value) {
    const note = itemsList.find((el) => el.id == id);

    note[name] = value;

    fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
  }

  function removeItem(id) {
    fetch(`${URL}/${id}`, {
      method: 'DELETE',
    });

    itemsList = itemsList.filter((item) => item.id != id);

    renderItems(itemsList);
  }
});