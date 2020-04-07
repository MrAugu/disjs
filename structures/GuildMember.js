const RoleManager = require("../managers/RoleManager");
const User = require("./User");

class GuildMember {
  constructor (client, data, guild) {
    /**
     * The client which instantiated this GuildMember.
     * @type {client}
     */
    this.client = client;

    /**
     * The guild this guildmember belogs to.
     * @type {guild}
     */
    this.guild = guild;

    /**
     * The nickname of this member.
     * @type {string}
     */
    this.nickname = data.nick;

    /**
     * The date object representing when the member joined the guild.
     * @type {date}
     */
    this.joinedAt = new Date(data.joined_at);

    /**
     * The unix timestamp representing when the member joined the guild.
     * @type {number}
     */
    this.joinedTimestamp = new Date(data.joined_at).getTime();

    /**
     * A list of roles user has.
     * @type {rolemanager}
     */
    this.roles = new RoleManager(this.client);
    for (const role of data.roles) {
      this.roles.cache.set(role.id, this.guild.roles.cache.get(role.id));
    }

    /**
     * Whether the user is deafened in voice channels.
     * @type {bool}
     */
    this.deaf = data.deaf;

    /**
     * Whether or not the member is muted in guild channels.
     * @type {bool}
     */
    this.muted = data.mute;

    /**
     * This guild memebr use object.
     * @type {User}
     */
    this.user = new User(this.client, data.user);
  }
}

module.exports = GuildMember;