const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");
const dotenv = require('dotenv')

dotenv.config()

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES],
});

client.songs = []
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

client.on("messageCreate", (msg) => {
  if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;
  const args = msg.content.slice(process.env.PREFIX.length).split(" ");
  const command = args.shift();

  try {
    client.commands.get(command).execute(client, msg, args);
  } catch (e) {
    return;
  }
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);
