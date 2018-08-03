import config from '@/config';

const websocket = new WebSocket(config.socketURL);

websocket.onopen = (evt) => {
  websocket.send('socket open');
};

websocket.onmessage = (event) => {
  console.log('message: ', event.data);
  websocket.close();
};

websocket.onclose = () => {
  console.log('socket close');
};

export default websocket;
