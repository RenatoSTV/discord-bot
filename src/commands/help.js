const {prefix} = require('../../config.json')

const execute = (client, msg, args) => {
  let helps = "==== AJUDA ====\n";
  client.commands.forEach((command) => {
    if(command.help) {
      helps += `**${prefix}${command.name}**: ${command.help}\n`
    }
  });

  msg.channel.send(helps)
};

module.exports = {
  name: "help",
  execute,
};
