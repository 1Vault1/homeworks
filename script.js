$(() => {
  const CONTACTS_ITEM_CLASS = 'row';
  const REMOVE_BTN_CLASS = 'remove-btn'

  const CONTACTS_URL = 'http://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts';

  const $contactsInputName = $('#contactsInputName');
  const $contactsInputSurname = $('#contactsInputSurname');
  const $contactsInputPhone = $('#contactsInputPhone');
  const contactsItemTemplate = $('#contactsItemTemplate').html();

  const $addBtnEl = $('#addBtn').on('click', onAddBtn);
  const $contactsListEl = $('#contactsList')
    .on('click', '.' + REMOVE_BTN_CLASS, onRemoveBtnClick);

  const $dialog = $('#dialogForm').dialog({
    autoOpen: false,
    modal: true,
    resizable: false,
    close: () => {
      $contactsInputName.val('');
      $contactsInputSurname.val('');
      $contactsInputPhone.val('');
    },
    buttons: {
      Save: () => {
        const contact = {
          name: $contactsInputName.val(),
          surname: $contactsInputSurname.val(),
          phone: $contactsInputPhone.val(),
        };

        addContact(contact);
        $dialog.dialog('close');
      },
      Cancel: () => {
        $dialog.dialog('close');
      },
    },
  });

  let contactList = [];

  init();

  function init() {
    getContacts();
  }

  function onAddBtn() {
    console.log('ergtgf');
    openModal();
  }

  function onRemoveBtnClick() {
    const id = $(this).closest('.' + CONTACTS_ITEM_CLASS).data('id');

    removeItem(id);
  }

  function openModal() {
    console.log('open');
    $dialog.dialog('open');
  }

  function getContacts() {
    return fetch(CONTACTS_URL)
      .then((response) => response.json())
      .then((data) => contactList = data)
      .then(renderContacts);
  }

  function renderContacts(contacts) {
    $contactsListEl.html(
      contacts.map((contact) => contactsItemTemplate
        .replace('{{id}}', contact.id)
        .replace('{{name}}', contact.name)
        .replace('{{surname}}', contact.surname)
        .replace('{{phone}}', contact.phone)
      ).join(''));
  }

  function addContact(contact) {
    // delete contact.id;

    fetch(CONTACTS_URL, {
      method: 'POST',
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => res.json())
      .then((data) => {
        contactList.push(data);
        renderContacts(contactList);
      });
  }

  function deleteContact(id) {
    fetch(`${CONTACTS_URL}/${id}`, {
      method: 'DELETE',
    });

    contactList = contactList.filter((item) => item.id != id);

    renderContacts(contactList);
  }
});