class Guild {
  constructor (client, data) {
    /**
     * The client that instatiated the guild.
     * @type {Client}
     */
    this.client = client;

    /**
     * The guild's discord id.
     * @type {string}
     */
    this.id = data.id;

    /**
     * The guild's name.
     * @type {string}
     */
    this.name = data.name;

    /**
     * The guild's icon hash.
     * @type {string}
     */
    this.icon = data.icon;

    /**
     * The guild's splash hash.
     * @type {string}
     */
    this.splash = data.splash;

    /**
     * The guild's discovery splash hash.
     * @type {string}
     */
    this.discovery = data.discovery_splash;

    /**
     * The guild's owner id.
     * @type {string}
     */
    this.ownerID = data.owner_id;

    /**
     * The guild's voice region.
     * @type {string}
     */
    this.region = data.region;

    /**
     * The guild's afk channel id.
     * @type {string}
     */
    this.afkChannelID = data.afk_channel_id;

    /**
     * The guild's afk timeout.
     * @type {number}
     */
    this.afkTimeout = data.afk_timeout;

    /**
     * Whether the guild is embeddable (widget).
     * @type {bool}
     */
    this.embeddable = data.embed_enabled;

    /**
     * The guild's embed channel id.
     * @type {string}
     */
    this.embedChannelID = data.embed_channel_id;

    /**
     * The guild's verification level.
     * @type {number}
     */
    this.verificationLevel = data.verification_level;

    /**
     * The guild's message notififcation level.
     * @type {number}
     */
    this.defaultMessageNotificationLevel = data.default_message_notifications;

    /**
     * The guild's explicit content filter level.
     * @type {number}
     */
    this.explicitContentFilter = data.explicit_content_filter;

    this._roles = data.roles;
    this._emojis = data.emojis;
    
    /**
     * The guild's enabled feature list.
     * @type {Array}
     */
    this.features = data.features;

    /**
     * The guild's required mfa level.
     * @type {number}
     */
    this.mfaLevel = data.mfa_level;

    /**
     * Application ID of the guild's creator (if bot created.)
     * @type {string}
     */
    this.applicationID = data.application_id;

    /**
     * Whether or not the server widget is enabled.
     * @type {bool}
     */
    this.widgetEnabled = data.widget_enabled;

    /**
     * The widget's channel id.
     * @type {string}
     */
    this.widgetChannelID = data.widget_channel_id;

    /**
     * The system channel's id.
     * @type {string}
     */
    this.systemChannelID = data.system_channel_id;

    /**
     * The system channel's flags.
     * @type {number}
     */
    this.systemChannelFlags = data.system_channel_flags;

    /**
     * The id of the channel where "PUBLIC" guilds display rules and/or guidelines.
     * @type {string}
     */
    this.rulesChannelID = data.rules_channel_id;

    /**
     * When this guild was joined at by the bot. (ISO8601  Timestamp)
     * @type {timestamp}
     */
    this.joinedAt = data.joined_at;

   /**
    * Whether or not the guild is considered large.
    * @type {bool}
    */
   this.large = data.large;

   /**
    * Whether or not the guild is unavailable or not.
    * @type {bool}
    */
   this.unavailable = data.unavailable;

   /**
    * The total number of members in the guild.
    * @type {number}
    */
   this.memberCount = data.member_count;

   this._voiceStates = data.voice_states;
   this._members = data.members;
   this._channels = data.channels;
   this._presences = data.presences;

   /**
    * The maximum amount of presences for this guild.
    * @type {number}
    */
   this.maximumPresences = data.max_presences;

   /**
    * The maximum amount of users for this guild.
    * @type {number}
    */
   this.maximumMembers = data.max_members;

   /**
    * The guild's vanity url code.
    * @type {string}
    */
   this.vanityUrlCode = data.vanity_url_code;
   
   /**
    * The description for the guild.
    * @type {string}
    */
   this.description = data.description;

   /**
    * The guild's banner hash.
    * @type {string}
    */
   this.banner = data.banner;

   /**
    * The guild's server boost level.
    * @type {number}
    */
   this.premiumTier = data.premium_tier;

   /**
    * The amount of boosts this server currently has.
    * @type {number}
    */
   this.premiumSubscriptionCount = data.premium_subscription_count;

   /**
    * The preferred locale of a "PUBLIC" guild used in server discovery and notices from Discord; defaults to "en-US".
    * @type {string}
    */
   this.preferredLocale = data.preferred_locale;

   /**
    * The id of the channel where admins and moderators of "PUBLIC" guilds receive notices from Discord.
    * @type {string}
    */
   this.publicUpdatesChannelID = data.public_updates_channel_id;

  }
}

module.exports = Guild;