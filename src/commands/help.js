const dotenv = require('dotenv')

dotenv.config()

const execute = (client, msg, args) => {
  let helps = "==== AJUDA ====\n";
  client.commands.forEach((command) => {
    if(command.help) {
      helps += `**${process.env.PREFIX}${command.name}**: ${command.help}\n`
    }
  });

  msg.channel.send(helps)
};

module.exports = {
  name: "help",
  execute,
};
