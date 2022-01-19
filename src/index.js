const Discord = require("discord.js");
const { token, prefix } = require("../config.json");
const fs = require("fs");
const path = require("path");

// Create a new client instance
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync(path.join(__dirname, "/commands"))
  .filter((filename) => filename.endsWith(".js"));

for (let filename of commandFiles) {
  const command = require(`./commands/${filename}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
});
client.once("reconnecting", () => {
  console.log("Reconnecting!");
});
client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on("messageCreate", (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).split(" ");
  const command = args.shift();

  try {
    client.commands.get(command).execute(client, msg, args);
  } catch (e) {
    return;
  }
});

// Login to Discord with your client's token
client.login(token);
