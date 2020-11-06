import { addMessage } from './app';

const URL = 'wss://fep-app.herokuapp.com/';
const socket = new WebSocket(URL);

export const chat = {
  socketOnOpen: socket.onopen = () => {
    console.log('connected');
  },
  socketOnClose: socket.onclose = () => {
    console.log('close');
  },
  socketOnMessage: socket.onmessage = (message) => {
    addMessage(JSON.parse(message.data));
  },
};

export function socketSend(name, message) {
  return socket.send(JSON.stringify({
    type: 'message',
    payload: {
      username: name,
      message: message,
    }
  }));
}
