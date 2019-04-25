import io from 'socket.io-client';
import config from '../../constants/configs';
export default class SocketManager {

  static socket = null;
  constructor(token) {
    console.log('Contructor');
    this.socket = io(config.socketUrl, { query: { token } });
  }
  /**
   * @returns {SocketManager}
   */
  static getInstance(token) {
    if (!this.socket) {
      this.socket = new SocketManager(token).socket;
    }
    return this.socket;
  }

}