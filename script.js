const CONTACTS_ITEM_CLASS = 'row';
const DELETE_BTN_CLASS = 'remove-btn';
const EDIT_BTN_CLASS = 'edit-btn';
const NAME_CLASS = 'name-item';


const CONTACTS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts';

const contactsListEl = document.getElementById('contactsList');
const contactsInputId = document.getElementById('contactsInputId');
const contactsInputName = document.getElementById('contactsInputName');
const contactsInputSurname = document.getElementById('contactsInputSurname');
const contactsInputPhone = document.getElementById('contactsInputPhone');
const contactsItemTemplate = document.getElementById('contactsItemTemplate').innerHTML;
const addContactForm = document.getElementById('addContactForm');

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
      deleteContact(e.target.closest('.' + CONTACTS_ITEM_CLASS).dataset.id);
      break;

    case e.target.classList.contains(EDIT_BTN_CLASS):
      editContact(e.target.closest('.' + CONTACTS_ITEM_CLASS).dataset.id);
      break;
  }
}

function submitForm() {
  const contact = getFormData();

  if (contact.id) {
    updateContact(contact);
  } else {
    addContact(contact);
  }
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

function deleteContact(id) {
  fetch(`${CONTACTS_URL}/${id}`, {
    method: 'DELETE',
  });

  contactList = contactList.filter((item) => item.id != id);

  renderContacts(contactList)
}

function editContact(id) {
  const item = contactList.find((el) => el.id == id);

  fillForm(item);
}

function addContact(contact) {

  delete contact.id;

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
      resetForm();
    });
}

function updateContact(contact) {
  fetch(`${CONTACTS_URL}/${contact.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  }).catch(() => getList());

  contactList = contactList.map((el) => (el.id != contact.id ? el : contact));

  renderContacts(contactList);
  resetForm();
}

function getFormData() {
  return {
    id: contactsInputId.value,
    name: contactsInputName.value,
    surname: contactsInputSurname.value,
    phone: contactsInputPhone.value,
  };
}

function fillForm(obj) {
  contactsInputId.value = obj.id;
  contactsInputName.value = obj.name;
  contactsInputSurname.value = obj.surname;
  contactsInputPhone.value = obj.phone;
}

function resetForm() {
  addContactForm.reset();
}