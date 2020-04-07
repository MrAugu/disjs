const Collection = require("../structures/Collection");
const Role = require("../structures/Role");
const User = require("../structures/User");

const collectifyRole = (guild, client, roleArray) => {
  const roleCollection = new Collection();

  for (const role of roleArray) {
    roleCollection.set(role.id, new Role(client, guild, role));
  }

  return roleCollection;
};

const collectifyUser = (client, userArray) => {
  const userCollection = new Collection();
   
  for (const user of userArray) {
    userCollection.set(user.id, new User(client, user));
  }

  return userCollection;
}

module.exports = {
  collectifyRole
};