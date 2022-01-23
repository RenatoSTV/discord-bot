
const execute = (client, msg, args) => {
  client.player.stop()
  client.songs = []
};
module.exports = {
  name: "stop",
  help: "Para de reproduzir a música atual.",
  execute,
};
