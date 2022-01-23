
const execute = (client, msg, args) => {
  const channel = msg.member.voice.channel;

  client.player.stop()
  client.songs = []
};
module.exports = {
  name: "stop",
  help: "Para de reproduzir a música atual.",
  execute,
};
