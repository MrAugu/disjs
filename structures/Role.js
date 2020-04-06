class Role {
  constructor (client, guild, data) {
    /**
     * The client that instantiated this role.
     * @type {client}
     */
    this.client = client;

    /**
     * The guild object the role belongs to.
     * @type {Guild}
     */
    this.guild = guild;

    /**
     * The role's id.
     * @type {string}
     */
    this.id = data.id;

    /**
     * The role's name.
     * @type {string}
     */
    this.name = data.name;

    /**
     * The role's color value.
     * @type {number}
     */
    this.color = data.color;

    /**
     * Whether the role is hoisted or not.
     * @type {bool}
     */
    this.hoisted = data.hoist;

    /**
     * Role's position in the guild hierarcy.
     * @type {number}
     */
    this.position = data.position;

    /**
     * Permission bit set for this role.
     * @type {number}
     */
    this.permissions = data.permissions;

    /**
     * Whether or not the role is managed by an integration.
     * @type {bool}
     */
    this.managed = data.managed;

    /**
     * Whether or not the role is mentionable.
     * @type {bool}
     */
    this.mentionable = data.mentionable;
  }
}

module.exports = Role;