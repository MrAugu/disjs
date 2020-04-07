const { EventEmitter } = require("events");
const WebSocket = require("ws");
const ClientUser = require("../structures/ClientUser");
const Guild = require("../structures/Guild");

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

    /**
     * The latency between last heartbeat sending and acknowledgement in ms.
     * @type {number} 
     */
    this.ping = -1;

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
    this._socket.on("close", () => this.onClose());

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
        setTimeout(() => {
          if (this.lastHearbeat - this.lastHearbeatAcknowledged > 6500) {
            this.client.emit("debug", `[Connection Health] No heartbeat acknowledgement received in the last ${this.lastHearbeat - this.lastHearbeatAcknowledged}ms, terminating the connection.`);
            this._socket.terminate();
          } else {
            this.client.emit("debug", `[Connection Health] Connection alive, latency between sending and receiving acknowledgement is ${this.lastHearbeatAcknowledged - this.lastHearbeat}ms.`);
          }
        }, 7000);
      }, payload.d.heartbeat_interval);
      this.client.emit("debug", `Setting the hearbeat interval at ${payload.d.heartbeat_interval}ms.`);
      this._heartbeatInterval = interval;
      this.heartbeatInterval = payload.d.heartbeat_interval;
      this.identify();
    } else if (payload.op === 11) {
      this.client.emit("debug", "Heartbeat acknowledged.");
      this.lastHearbeatAcknowledged = Date.now();
      this.ping = this.lastHearbeatAcknowledged - this.lastHearbeat;
    } else if (payload.op === 9) {
      // Handle Invalid Session
    } else if (payload.t === "READY") {
      this.state = "READY";
      this.client.session.id = payload.d.session_id;
      this.client.user = new ClientUser(this.client, payload.d.user);
      this.client.__unavailableGuilds = payload.d.guilds;

      if (!this.client.__unavailableGuilds) {
        this.client.emit("debug", "No guilds to await loading, marking the client as ready.");
        this.client.ready = true;
        this.client.emit("ready");
      } else {
        this.client.emit("debug", `GatewayManager has reached the ready state. Awaiting ${this.client.__unavailableGuilds.length} guild(s) to be received before marking the bot as ready.`);
      }
    } else if (payload.t === "GUILD_CREATE" && !this.client.ready) {
      const newGuild = new Guild(this.client, payload.d);
      this.client.guilds.set(newGuild.id, newGuild);
      console.log(this.client.guilds.first().emojis); 
    }
  }

  onOpen() {
    this.client.emit("debug", "Connection to the gateway opened.");
    this.state = "CONNECTED";
    this.connected = true;
  }

  onClose() {
    this.state = "DISCONNECTED";
    this.connected = false;
    clearInterval(this._heartbeatInterval);
    this.client.emit("debug", "Gateway connection has been closed, cleaning the heartbeat interval.\n(SoonTM) Attempting to RESUME...");
  }

  identify() {
    this.client.emit("debug", "Preparing to send the IDENTIFY event.");
    this.state = "HANDSHAKING";
    const identifyPayload = {
      op: 2,
      d: {
        token: this.client.token,
        properties: {
          "$os": process.platform,
          "$browser": "disjs",
          "$device": "disjs"
        },
        large_threshold: 250,
        presence: {
          status: "online",
          afk: false
        }
      }
    };
    this._socket.send(JSON.stringify(identifyPayload));
    this.client.emit("debug", "Sent the IDENTIFY event.");
  }
}

module.exports = GatewayManager;