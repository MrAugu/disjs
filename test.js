const Discord = require('./index');
const { token } = require("./secret.json");
const client = new Discord.Client(token);

client.on("debug", (text) => {
  console.log(text);
});

client.on("ready", () => {
  console.log(`Client is online. (${client.guilds.size} Guilds - ${client.users.size} Users - ${client.channels.size} Channels)`)
});

client.login();