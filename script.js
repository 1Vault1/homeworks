$(() => {
  const ITEM_CLASS = 'item';
  const REMOVE_BTN_CLASS = 'remove-btn';
  const TEXTAREA_CLASS = 'textarea';

  const URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers';

  const $addBtnEl = $('#addBtn');
  const stickerTemplate = $('#stickerTemplate').html();
  const $listItemsEl = $('#listItems')
    .on('click', '.' + REMOVE_BTN_CLASS, onRemoveBtnClick)
    .on('change', '.' + TEXTAREA_CLASS, onChangelistItemsEl);

  const $newNoteDescription = $('#newNoteDescription');
  const $dialog = $('#dialogForm').dialog({
    autoOpen: false,
    modal: true,
    resizable: false,
    close: () => {
      $newNoteDescription.val('');
    },
    buttons: {
      Save: () => {
        const item = {
          description: $newNoteDescription.val()
        };

        addItem(item);
        $dialog.dialog('close');
      },
      Cancel: () => {
        $dialog.dialog('close');
      },
    },
  });

  let itemsList = [];

  $addBtnEl.on('click', onAddBtn);

  init();

  function init() {
    getItems();
  }

  function onAddBtn() {
    openModal();
  }

  function onRemoveBtnClick() {
    const id = $(this).closest('.' + ITEM_CLASS).data('id');

    removeItem(id);
  }

  function onChangelistItemsEl() {
    let $element = $(this);

    updateTextarea(
      $element.closest('.' + ITEM_CLASS).data('id'),
      $element.data('name'),
      $element.val()
    );
  }

  function openModal() {
    console.log('open');
    $dialog.dialog('open');
  }

  function getItems() {
    return fetch(URL)
      .then((res) => res.json())
      .then((data) => itemsList = data)
      .then(renderItems);
  }

  function renderItems(list) {
    $listItemsEl.html(
      list.map((item) => stickerTemplate
        .replace('{{id}}', item.id)
        .replace('{{description}}', item.description)
      ).join(''));
  }

  function addItem(item) {
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