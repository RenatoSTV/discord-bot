const execute = (client, msg, args) => {
  client.player.pause();
};
module.exports = {
  name: "pause",
  help: "Pausa a música que está sendo reproduzida.",
  execute,
};
