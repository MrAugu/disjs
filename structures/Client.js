const RequestManager = require("../rest/RequestManager");
const { EventEmitter } = require("events");
const Request = require("../rest/Request");
const { buildUrl } = require("../utils/Rest");
const Endpoints = require("../rest/Endpoints");
const GatewayManager = require("../gateway/GatewayManager");

class Client extends EventEmitter {
  constructor (token) {
    super();

    /**
     * The token the client will be logged in with.
     * @type {string}
     */
    this.token = token;

    /**
     * The RequestManager this client uses.
     * @type {RequestManager}
     */

    this._requestManager = new RequestManager(this, "Bot");

    /**
     * The API version this client uses.
     * @type {number}
     */
    this.version = 6;

    /**
     * Session data retrived from bot_gateway http request and gateway ready event.
     * @type {object}
     */
    this.sessionData = {};

    /**
     * The GatewayManager for this client.
     * @type {GatewayManager}
     */
    this._gatewayManager = new GatewayManager(this);
  }

  async login () {
    if (!this.token) throw new TypeError("A token must be specified.");

    this.emit("debug", "Preparing to connect to the gateway...");

    const botGatewayRequest = new Request("get", buildUrl(Endpoints.BASE_URL, this.version, Endpoints.BOT_GATWAY), {
      headers: {
        "authorization": `${this._requestManager.authorizationPrefix} ${this.token}`
      }
    });

    const botGatewayResponse = await this._requestManager.push(botGatewayRequest);
    this.emit("debug", `Bot Gatway Response Details:\n- Url: ${botGatewayResponse.url}\n- Recomended Amount of shards: ${botGatewayResponse.shards}\nSession Start Limit Information:\n- Total Limit: ${botGatewayResponse.session_start_limit.total}\n- Remaining: ${botGatewayResponse.session_start_limit.remaining}\n- Resets After: ${botGatewayResponse.session_start_limit.reset_after}ms`);
    this._gatewayManager.bindTo(botGatewayResponse.url);
    this._gatewayManager.connect();
  }
}

module.exports = Client;