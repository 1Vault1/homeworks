const CONTACTS_ITEM_CLASS = '.row';
const VISIBLE_ERROR_CLASS = 'visible';
const DELETE_BTN_CLASS = 'remove-btn';

const addContactForm = document.getElementById('addContactForm');
const contactsListEl = document.getElementById('contactsList');
const contactsInputName = document.getElementById('contactsInputName');
const contactsInputNumber = document.getElementById('contactsInputNumber');
const contactsInputEmail = document.getElementById('contactsInputEmail');
const contactsItemTemplate = document.getElementById('contactsItemTemplate').innerHTML;
const contactsError = document.getElementById('contactsError');

let contactList = [];

addContactForm.addEventListener('submit', onAddContactForm);
contactsListEl.addEventListener('click', onContactsListElClick);

init();

function onAddContactForm(event) {
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
  resetForm();
}

function addContact(obj) {
  if (validateForm(obj)) {
    contactList.push(obj);

    saveData();
    renderContact(obj);

    removeClass(contactsError, VISIBLE_ERROR_CLASS);
  }
}

function resetForm() {
  addContactForm.reset();
}

function renderContacts() {
  contactList.forEach((contact) => renderContact(contact));
}

function renderContact(obj) {
  const html = Object.keys(obj).reduce((template, key) => template.replace('{{' + key + '}}', obj[key]), contactsItemTemplate);

  return contactsListEl.insertAdjacentHTML('beforeend', html);
}

function validateForm(obj) {
  let valid = true;

  const invalidKey = Object.keys(obj).find((key) => obj[key].length === 0);

  if (invalidKey) {
    addClass(contactsError, VISIBLE_ERROR_CLASS);
    valid = false;
  }

  return valid
}

function deleteTask(el) {
  const contactId = +el.dataset.contactId;

  contactList = contactList.filter((item) => item.id !== contactId);

  saveData();

  el.remove();
}

function saveData() {
  localStorage.setItem('contactList', JSON.stringify(contactList));
}

function restoreData() {
  const data = localStorage.getItem('contactList');
  contactList = data ? JSON.parse(data) : [];
}

function addClass(el, classItem) {
  el.classList.add(classItem);
}

function removeClass(el, classItem) {
  el.classList.remove(classItem);
}