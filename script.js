const CONTACTS_ITEM_CLASS = 'row';
const DELETE_BTN_CLASS = 'remove-btn';

const CONTACTS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts/';

const contactsListEl = document.getElementById('contactsList');
const contactsInputName = document.getElementById('contactsInputName');
const contactsInputSurname = document.getElementById('contactsInputSurname');
const contactsInputPhone = document.getElementById('contactsInputPhone');
const contactsItemTemplate = document.getElementById('contactsItemTemplate').innerHTML;
const addContactForm = document.getElementById('addContactForm')

let contactList = [];

addContactForm.addEventListener('submit', onAddContactForm);
contactsListEl.addEventListener('click', onContactsListElClick);

init();

function init() {
  getContacts();
}

function onAddContactForm(event) {
  event.preventDefault();

  submitForm();
}

function onContactsListElClick(e) {
  switch (true) {
    case e.target.classList.contains(DELETE_BTN_CLASS):
      deleteContact(e.target.closest('.' + CONTACTS_ITEM_CLASS));
      break;
  }
}

function submitForm() {
  const contact = {
    name: contactsInputName.value,
    surname: contactsInputSurname.value,
    phone: contactsInputPhone.value,
  };

  addContact(contact).then(getContacts);
  resetForm();
}

function getContacts() {
  return fetch(CONTACTS_URL)
    .then((response) => response.json())
    .then((data) => contactList = data)
    .then(renderContacts);
}

function renderContacts(contacts) {
  contactsListEl.innerHTML = contacts.map(
    (contact) => contactsItemTemplate
      .replace('{{id}}', contact.id)
      .replace('{{name}}', contact.name)
      .replace('{{surname}}', contact.surname)
      .replace('{{phone}}', contact.phone)
  ).join('');
}

function addContact(obj) {
  return fetch(CONTACTS_URL, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

function deleteContact(el) {
  const id = +el.dataset.id;

  fetch(CONTACTS_URL + id, {
    method: 'DELETE',
  }).then(getContacts);
}

function resetForm() {
  addContactForm.reset();
}