const CONTACTS_ITEM_CLASS = '.row';
const DELETE_BTN_CLASS = 'remove-btn';

const addButtonEl = document.getElementById('addButton');
const contactsListEl = document.getElementById('contactsList');
const contactsInputName = document.getElementById('contactsInputName');
const contactsInputNumber = document.getElementById('contactsInputNumber');
const contactsInputEmail = document.getElementById('contactsInputEmail');
const contactsItemTemplate = document.getElementById('contactsItemTemplate').innerHTML;
const contactsError = document.getElementById('contactsError');

let contactList = [];

addButtonEl.addEventListener('click', onAddButtonElClick);
contactsListEl.addEventListener('click', onContactsListElClick);

init();

function onAddButtonElClick(event) {
  event.preventDefault();

  submitForm();
}

function onContactsListElClick(e) {
  if (e.target.classList.contains(DELETE_BTN_CLASS)) {
    deleteTask(e.target.closest(CONTACTS_ITEM_CLASS));
  }
}

function init() {
  restoreData();
  renderContacts();
}

function submitForm() {
  const contact = {
    id: Math.random(),
    name: contactsInputName.value,
    phone: contactsInputNumber.value,
    email: contactsInputEmail.value,
  };

  addContact(contact);
}

function addContact(obj) {
  if (validateForm(obj)) {
    contactList.push(obj);

    saveData();
    renderContact(obj);

    contactsError.style.opacity = '0';
  }
}

function renderContacts() {
  contactList.forEach((contact) => renderContact(contact))
}

function renderContact(obj) {
  let html = contactsItemTemplate;

  Object.keys(obj).forEach(function (key) {
    html = html.replace(`{{${key}}}`, obj[key]);
    return html
  });

  return contactsListEl.insertAdjacentHTML('beforeend', html);
}

function validateForm(obj) {
  let valid = true;

  Object.keys(obj).find(function (key) {
    if (obj[key].length === 0) {
      contactsError.style.opacity = '1';
      return valid = false;
    }
  });

  return valid
}

function deleteTask(el) {
  const contactId = +el.dataset.contactId;

  contactList = contactList.filter((item) => item.id !== contactId);

  saveData();

  el.remove();
}

function saveData() {
  localStorage.setItem('contactList', JSON.stringify(contactList))
}

function restoreData() {
  const data = localStorage.getItem('contactList');
  contactList = data ? JSON.parse(data) : [];
}