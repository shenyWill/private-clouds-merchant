import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class Socket {
  constructor (socketURL) {
    const socket = new SockJS(socketURL);
    const stomp = new Stomp.over(socket);
    return stomp;
  }

  connect (login, passcode, callback) {
    this.connect(login, passcode, callback);
    return this;
  }

  subscribe (url, callback) {
    this.subscribe(url, callback);
  }

  disconnect (callback) {
    this.disconnect(callback);
  }
}

export default Socket;
