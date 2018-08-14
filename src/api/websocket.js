import config from '@/config';
import SockJS from 'sockjs-client';

const websocket = new SockJS(config.socketURL);

websocket.onopen = (evt) => {
  console.log('open');
  try {
    websocket.send('socket open');
  } catch (e) {
    console.log(e);
  }
};

websocket.onmessage = (event) => {
  console.log(event);
  console.log('message: ', event.data);
  websocket.close();
};

websocket.onclose = () => {
  console.log('socket close');
};

export default websocket;
