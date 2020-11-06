import $ from 'jQuery';
import { chat, socketSend } from './Chat';
import '../css/style.css';

const $container = $('.container');
const $form = $('#form');
const $nameInput = $('#nameInput');
const $messageInput = $('#messageInput');

init();

$form.on('submit', (e) => {
  e.preventDefault();

  sendMessage();
});

function init() {
  chat.socketOnOpen;
  chat.socketOnClose;
  chat.socketOnMessage;
}

function sendMessage() {
  socketSend($nameInput.val(), $messageInput.val());
  $messageInput.val('');
}

export function addMessage({ payload }) {
  const $message = $(`<p>${payload.username}: ${payload.message}</p>`);
  $container.append($message);
}