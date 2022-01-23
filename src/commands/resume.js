const execute = (client, msg, args) => {

  client.player.unpause()
};
module.exports = {
  name: "resume",
  help: "Retoma a música que estava pausada reproduzida.",
  execute,
};
