import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class Socket {
  static created = false;
  static socket = null;
  static connected = false;

  constructor (socketURL) {
    if (!Socket.created) {
      const socket = new SockJS(socketURL);
      Socket.socket = Stomp.over(socket);
      Socket.created = true;
    }
    return Socket.socket;
  }

  connect (login, passcode, callback) {
    Socket.connected = true;
    this.connect(login, passcode, callback);
    return Socket.socket;
  }

  subscribe (url, callback) {
    this.subscribe(url, callback);
  }

  disconnect (callback) {
    Socket.connected = false;
    this.disconnect(callback);
  }

  isConnected () {
    return Socket.connected;
  }
}

export default Socket;
