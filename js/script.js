$(() => {
  const CONTACTS_ITEM_CLASS = 'row';
  const REMOVE_BTN_CLASS = 'remove-btn';
  const EDIT_BTN_CLASS = 'edit-btn';

  const CONTACTS_URL = 'http://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts';

  const $contactsInputId = $('#contactsInputId');
  const $contactsInputName = $('#contactsInputName');
  const $contactsInputSurname = $('#contactsInputSurname');
  const $contactsInputPhone = $('#contactsInputPhone');
  const contactsItemTemplate = $('#contactsItemTemplate').html();

  const $addBtnEl = $('#addBtn').on('click', onAddBtn);
  const $contactsListEl = $('#contactsList')
    .on('click', '.' + REMOVE_BTN_CLASS, onRemoveBtnClick)
    .on('click', '.' + EDIT_BTN_CLASS, onEditBtnClick);

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
        submitForm();

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
    openModal();
  }

  function onRemoveBtnClick() {
    const id = $(this).closest('.' + CONTACTS_ITEM_CLASS).data('id');

    deleteContact(id);
  }

  function onEditBtnClick() {
    const id = $(this).closest('.' + CONTACTS_ITEM_CLASS).data('id');

    editContact(id);
  }

  function openModal() {
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

  function submitForm() {
    const contact = getFormData();

    if (contact.id) {
      updateContact(contact);
    } else {
      addContact(contact);
    }
  }

  function getFormData() {
    return {
      id: $contactsInputId.val(),
      name: $contactsInputName.val(),
      surname: $contactsInputSurname.val(),
      phone: $contactsInputPhone.val(),
    };
  }

  function addContact(contact) {
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

  function editContact(id) {
    const element = contactList.find((contact) => contact.id == id);

    fillForm(element);

    $dialog.dialog('open');
  }

  function updateContact(contact) {
    fetch(`${CONTACTS_URL}/${contact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    contactList = contactList.map((el) => (el.id != contact.id ? el : contact));

    renderContacts(contactList);
  }

  function fillForm(element) {
    $contactsInputId.val(element.id);
    $contactsInputName.val(element.name);
    $contactsInputSurname.val(element.surname);
    $contactsInputPhone.val(element.phone);
  }
});