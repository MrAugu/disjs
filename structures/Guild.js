const RoleManager = require("../managers/RoleManager");
const EmojiManager = require("../managers/EmojiManager");
const User = require("../structures/User");
const GuildMember = require("../structures/GuildMember");
const Collection = require("../structures/Collection");
const { Presence } = require("../structures/Presence");
const { Channel } = require("../structures/Channel");
const { verificationLevels, defaultMessageNotifications, explicitContentFilters, mfaLevels } = require("../constants/Guild");
const VoiceState = require("../structures/VoiceState");

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
     * The guild's verification level.
     * @type {string}
     */
    this.verificationLevel = verificationLevels[data.verification_level];

    /**
     * The guild's message notififcation level.
     * @type {string}
     */
    this.defaultMessageNotificationLevel = defaultMessageNotifications[data.default_message_notifications];

    /**
     * The guild's explicit content filter level.
     * @type {string}
     */
    this.explicitContentFilter = explicitContentFilters[data.explicit_content_filter];

    /**
     * An instance of RoleManager.
     * @type {RoleManager}
     */
    this.roles = new RoleManager(this.client);
    for (const role of data.roles) {
      this.roles.append(this, role);
    }
    
    /**
     * An instance of EmojiManager.
     * @type {EmojiManager}
     */
    this.emojis = new EmojiManager(this.client, this);
    for (const emoji of data.emojis) {
      this.emojis.append(emoji);
    }

    /**
     * The guild's enabled feature list.
     * @type {Array}
     */
    this.features = data.features;

    /**
     * The guild's required mfa level.
     * @type {string}
     */
    this.mfaLevel = mfaLevels[data.mfa_level];

    /**
     * Application ID of the guild's creator (if bot created.)
     * @type {string}
     */
    this.applicationID = data.application_id;

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

   /**
    * A collection of all members in this guild.
    * @type {collection}
    */
    this.members = new Collection();

    for (const member of data.members) {
      this.client.users.set(member.user.id, new User(this.client, member.user));
    }

    for (const member of data.members) {
      this.members.set(member.user.id, new GuildMember(this.client, member, this));
    }

    /**
     * A collection of channels in this guild.
     * @type {Collection}
     */
    this.channels = new Collection();

    for (const channel of data.channels) {
      this.client.channels.set(channel.id, new Channel(this.client, channel, this));
      this.channels.set(channel.id, new Channel(this.client, channel, this));
    }

    for (const presence of data.presences) {
      this.client.users.get(presence.user.id).presence = new Presence(presence);
    }

    /**
     * A collection of voice_states.
     * @type {Collection}
     */
    this.voiceStates = new Collection();

    for (const state of data.voice_states) {
      this.voiceStates.set(state.user_id, new VoiceState(this.client, state, this));
    }

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