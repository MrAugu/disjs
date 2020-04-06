const Collection = require("../structures/Collection");
const Role = require("../structures/Role");

const collectifyRole = (guild, client, roleArray) => {
  const roleCollection = new Collection();

  for (const role of roleArray) {
    roleCollection.set(role.id, new Role(client, guild, role));
  }

  return roleCollection;
};

module.exports = {
  collectifyRole
};