const Collection = require("../structures/Collection");
const Role = require("../structures/Role");

class RoleManager {
  constructor (client) {
    /**
     * The client that instantiated the RoleManager.
     */
    this.client = client;

    /**
     * A collection of cached roles.
     */
    this.cache = new Collection();
  }

  append(guild, data) {
    this.cache.set(data.id, new Role(this.client, guild, data));
  }
}

module.exports = RoleManager;