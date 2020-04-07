const Collection = require("../structures/Collection");
const Emoji = require("../structures/Emoji");

class EmojiManager {
  constructor (client, guild) {
    /**
     * The client that instantiated this EmojiManager.
     * @type {Client}
     */
    this.client = client;

    /**
     * A collection of cached emojis.
     * @type {Collection}
     */
    this.cache = new Collection();

    /**
     * Guild which manager belongs to.
     * @type {Guild}
     */
    this.guild = guild;
  }

  append (data) {
    this.cache.set(data.id, new Emoji(this.client, data, this.guild));
  }
}

module.exports = EmojiManager;