const Collection = require("./Collection");
const { channelTypes } = require("../constants/Channel");
const Request = require("../rest/Request");
const Endpoints = require("../rest/Endpoints");
const { buildUrl } = require("../utils/Rest");

class PermissionOverwrite {
  constructor (data) {
    /**
     * A role or user id.
     * @type {string}
     */
    this.id = data.id;

    /**
     * The type, an "user" or a "role".
     * @type {string}
     */
    this.type = data.type;

    /**
     * Allowed permission bit set.
     * @type {number}
     */
    this.allow = data.allow;

    /**
     * Denied permission bit set.
     * @type {number}
     */
    this.deny = data.deny;
  }
}

class Channel {
  constructor (client, data, guild) {
    /**
     * The client that instantiated this channel.
     * @type {client}
     */
    this.client = client;

    /**
     * The guild this channel belongs to.
     * @type {guild}
     */
    this.guild = guild;

    /**
     * The id of this channel.
     * @type {string}
     */
    this.id = data.id;

    /**
     * The type of this channel.
     * @type {string}
     */
    this.type = channelTypes[data.type];

    /**
     * Position of the channel.
     * @type {number}
     */
    this.position = data.position;

    /**
     * The permission overwrites for this channel.
     * @type {Collection}
     */
    this.permissionOverwrites = new Collection();

    for (const overwrite of data.permission_overwrites) {
      this.permissionOverwrites.set(overwrite.id, new PermissionOverwrite(overwrite));
    }

    /**
     * The name of the channel.
     * @type {string}
     */
    this.name = data.name;

    /**
     * The topic of this channel;
     * @type {string}
     */
    this.topic = data.topic || null;

    /**
     * Whether or not this channel is nsfw.
     * @type {bool}
     */
    this.nsfw = data.nsfw;

    /**
     * The ID of last message sent in the channel.
     * @type {string}
     */
    this.lastMessageID = data.last_message_id || null;

    /**
     * The bitrate of the channel.
     * @type {number}
     */
    this.bitrate = data.bitrate || null;

    /**
     * The user limit of the channel.
     * @type {number}
     */
    this.userLimit = data.user_limit || null;

    /**
     * Cooldown in miliseconds this channel has.
     * @type {number}
     */
    this.cooldown = data.rate_limit_per_user || 0;

    /**
     * The parent id of this channel.
     * @type {string}
     */
    this.parentID = data.parent_id || null;

    /**
     * The parent of this channel.
     * @type {Channel}
     */
    this.parent = !data.parentID ? null : this.client.channels.get(this.parentID);

    /**
     * The date object of the last pin in the channel.
     * @type {Date}
     */
    this.lastPinAt = data.last_pin_timestamp ? new Date(data.last_pin_timestam) : null;

    /**
     * The date timestamp of last pin in the channel.
     * @type {Date}
     */
    this.lastPinTimestamp = data.last_pin_timestamp ? new Date(data.last_pin_timestam).getTime() : null;
  }

  async send(message) {
    if (this.type !== "TEXT") throw new TypeError("You can only send messages in text channels.");

    const req = new Request("post", buildUrl(Endpoints.BASE_URL, this.client.version, Endpoints.SEND_MESSAGE(this.id)), this.client.token, {
      body: {
          "content": message
      },
      headers: {
        "Content-Type": "application/json"
      }
    });

    return await this.client._requestManager.push(req);
  }
}

module.exports = {
  PermissionOverwrite,
  Channel
}