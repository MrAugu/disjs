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
  }
}