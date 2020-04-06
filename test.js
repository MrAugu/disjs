const Discord = require('./index');
const { token } = require("./secret.json");
const client = new Discord.Client(token);

client.on("debug", (text) => {
  console.log(text);
});

client.login();