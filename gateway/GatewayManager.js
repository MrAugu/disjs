const { EventEmitter } = require("events");
const WebSocket = require("ws");

class GatewayManager extends EventEmitter {
  constructor (client) {
    super();

    this.client = client;

    /**
     * The url gateway is connecting to.
     * @type {string}
     */
    this.url = null;

    /**
     * State is a string which denotes the state of the bot.
     * @type {string}
     */
    this.state = null;
    
    /**
     * Wether the manager is connected to the gateway or not.
     * @type {bool}
     */
    this.connected = false;

    /**
     * Last sequence number received from the gateway.
     * @type {number}
     */
    this.sequence = null;

    /**
     * The heartbeat interval object.
     * @type {interval}
     */
    this._heartbeatInterval = null;

    /**
     * The interval of the heartbeats are sent in ms.
     * @type {number}
     */
    this.heartbeatInterval = -1;

    /**
     * The timestamp of the last heartbeat sent.
     * @type {number}
     */
    this.lastHearbeat = -1;

    /**
     * The timestamp of the last heartbeat acknowledged.
     * @type {number}
     */
    this.lastHearbeatAcknowledged = -1;

    /**
     * The socket of the connecion to the gatway.
     * @type {WebSocket}
     */
    this._socket = null;

    this.on("raw", (data) => this.onRaw(data));
    this.on("open", () => this.onOpen());
  }

  bindTo(url) {
    this.url = `${url}/?v=${this.client.version}&encoding=json`;
    this.client.emit("debug", `GatewayManager bound to: ${this.url}`);
    return this.url;
  }

  connect() {
    this.client.emit("debug", "Connecting to the gateway...");
    this._socket = new WebSocket(this.url);

    this._socket.on("message", (data) => this.emit("raw", data));
    this._socket.on("open", () => this.emit("open"));

    this.state = "CONNECTING";
  }

  onRaw(data) {
    const payload = JSON.parse(data);
    if (payload.s && payload.s !== this.sequence) this.sequence = payload.s;

    if (payload.op === 10) {
      const interval = setInterval(async () => {
        const payloadObject = {
          op: 1,
          d: (this.sequence ? this.sequence : null)
        }
        this._socket.send(JSON.stringify(payloadObject));
        this.client.emit("debug", `Sending a heartbeat.`);
        this.lastHearbeat = Date.now();
      }, payload.d.heartbeat_interval);
      this.client.emit("debug", `Setting the hearbeat interval at ${payload.d.heartbeat_interval}ms.`);
      this._heartbeatInterval = interval;
    }
  }

  onOpen() {
    this.client.emit("debug", "Connection to the gateway opened.");
  }
}

module.exports = GatewayManager;