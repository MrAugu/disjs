class VoiceState {
  constructor (client, data, guild) {
    /**
     * Client that instantiated this VoiceState.
     * @type {Client}
     */
    this.client = client;

    /**
     * The guild thise voicestate belongs to.
     * @type {guild}
     */
    this.guild = guild;

    /**
     * The id of the channel user is connected to.
     * @type {string}
     */
    this.channelID = data.channel_id;

    /**
     * The channel object user is connected to.
     * @type {channel}
     */
    this.channel = this.client.channels.get(this.channelID);

    /**
     * The id of the user is.
     * @type {string}
     */
    this.userID = data.user_id;

    /**
     * The user object.
     * @type {channel}
     */
    this.user = this.client.users.get(this.userID);

    /**
     * The member object.
     * @type {GuildMember}
     */
    this.member = this.guild.members.get(this.userID);

    /**
     * The session id of the voicestate.
     * @type {string}
     */
    this.sessionID = data.session_id;

    /**
     * Whether this user is deafened by the server.
     * @type {bool}
     */
    this.deaf = data.deaf;

    /**
     * Whether this user is muted by the server.
     * @type {bool}
     */
    this.muted = data.mute;

    /**
     * Whether this user is locally deafned.
     * @type {bool}
     */
    this.selfDeaf = data.self_deaf;

    /**
     * Whether this user is locally muted.
     * @type {bool}
     */
    this.selfMuted = data.self_mute;

    /**
     * Whether the user is streaming using 'Go Live' feature.
     * @type {bool}
     */
    this.streaming = data.self_stream;

    /**
     * Whether the user is muted by the current user.
     * @type {bool}
     */
    this.suppress = data.suppress || null;
  }
}

module.exports = VoiceState;