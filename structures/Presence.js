class Game {
  constructor (data) {
    /**
     * The type of the game.
     * @type {number}
     */
    this.type = data.type;

    /**
     * The name of the game.
     * @type {string}
     */
    this.name = data.name;

    /**
     * The id of the game.
     * @type {string}
     */
    this.id = data.id;
  }
}

class Presence {
  constructor (data) {
    /**
     * The status of this presence.
     * @type {string}
     */
    this.status = data.status;
    
    /**
     * The game the user plays.
     * @type {Game}
     */
    this.game = !data.game ? null : new Game(data.game);

    /**
     * An object of client statuses.
     * @type {object}
     */
    this.clientStatus = {
      web: data.client_status.web,
      desktop: data.client_status.desktop || null,
      mobile: data.client_status.mobile || null
    };
  }
}

module.exports = {
  Game,
  Presence
};