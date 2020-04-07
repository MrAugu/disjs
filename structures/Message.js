class Message {
  constructor(client, data) {
    /**
     * The client that instantiated this message.
     */
    this.client = client;

    /**
     * The id of the message.
     */
    this.id = data.id

    /**
     * The channel this message was sent in.
     */
    this.channel = this.client.channels.get(data.channel_id);

    /**
     * The guild this message was sent in.
     */
    this.guild = this.client.guilds.get(data.guild_id);

    /**
     * The author of this message.
     */
    this.author = this.client.users.get(data.author.id);

    /**
     * The member object of this message.
     */
    this.member = this.guild.members.get(data.author.id);

    /**
     * The content of the message.
     */
    this.content = data.content;

    /**
     * The timestamp of the message.
     */
    this.timestamp = new Date(data.timestamp);
    
    /**
     * Whether this message is a TTS.
     */
    this.tts = data.tts;

    /**
     * Whether this message mentions here/everyone.
     */
    this.mentionsEveryone = data.mentions_everyone;

    /**
     * Embeds of this message.
     */
    this.embeds = data.embeds;

    /**
     * Array of attachments.
     */
    this.attachment = data.attachments;

    /**
     * Array of reactions.
     */
    this.reactions = data.reactions;
  }
}

module.exports = Message;