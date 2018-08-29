import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class Socket {
  static instance = null;

  constructor (socketURL) {
    this.socketJS = new SockJS(socketURL);
    this.socket = Stomp.over(this.socketJS);
    // this.socket.debug = null;
    Socket.instance = null;
  }

  static init (socketURL) {
    if (!Socket.instance) {
      Socket.instance = new Socket(socketURL);
    }
    return Socket.instance;
  }

  connect (login, passcode, callback) {
    this.connected = true;
    this.socket.connect(login, passcode, callback);
    return this;
  }

  subscribe (url, callback) {
    this.socket.subscribe(url, callback);
  }

  disconnect (callback) {
    this.connected = false;
    Socket.instance = null;
    this.socket.disconnect(callback);
  }

  unsubscribe () {
    this.socket.unsubscribe();
  }

  isConnected () {
    return this.connected;
  }
}

export default Socket;
