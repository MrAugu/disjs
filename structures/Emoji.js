const RoleManager = require("../managers/RoleManager");
const User = require("./User");

class Emoji {
  constructor (client, data, guild) {
    /**
     * Client that instantiated this emoji.
     * @type {Client}
     */
    this.client = client;

    /**
     * The guild this emoji belongs to.
     * @type {Guild}
     */
    this.guild = guild;

    /**
     * The id of this emoji.
     * @type {string}
     */
    this.id = data.id;

    /**
     * The name of this emoji.
     * @type {string}
     */
    this.name = data.name;

    /**
     * Roles this emoji is whitelisted to.
     * @type {RoleManager} 
     */
    this.roles = new RoleManager(this.client);
    for (const role of data.roles) {
      this.roles.cache.set(role.id, this.guild.roles.cache.get(role.id));
    }

    /**
     * Whether the emoji must be wrapped in colors or not.
     * @type {bool}
     */
    this.requireColons = data.require_colons;

    /**
     * Whether the emoji is managed by an integration or not.
     * @type {bool}
     */
    this.managed = data.managed;

    /**
     * Whether the emoji is animated or not.
     * @type {bool}
     */
    this.animated = data.animated;

    /**
     * Whether this emoji can be used, may be false due to loss of Server Boosts.
     * @type {bool}
     */
    this.available = data.available;
  }
}

module.exports = Emoji;