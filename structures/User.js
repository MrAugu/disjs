class User {
  constructor (client, data) {
    /**
     * Client that instantiated this class.
     * @type {Client}
     */
    this.client = client;

    /**
     * The user's id.
     * @type {string} - Snowflake
     */
    this.id = data.id;

    /**
     * The user's username.
     * @type {string}
     */
    this.username = data.username;

    /**
     * The user's 4-digit discord tag.
     * @type {string}
     */
    this.discriminator = data.discriminator;

    /**
     * The user's avatar hash.
     * @type {string}
     */
    this.avatar = data.avatar || null;

    /**
     * Whether the user belongs to an OAuth2 application or not.
     * @type {bool}
     */
    this.bot = data.bot || false;

    /**
     * Whether the user is an Official Discord System user (part of the urgent message system).
     * @type {bool}
     */
    this.system = data.system || false;

    /**
     * The locale of the user's client (ISO 639-1).
     * @type {string}
     */
    this.locale = data.locale || null;

    /**
     * The 'discord tag' for this user of, format: {Username}#{Discriminator}.
     * @type {string}
     */
    this.tag = `${this.username}#${this.discriminator}`;
  }
}

module.exports = User;