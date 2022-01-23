const playSong = require("./play").playSong;

const execute = (client, msg, args) => {
  const channel = msg.member.voice.channel;

  const song = client.songs[0];
  msg.channel.send(`A música ${song.title} foi skippada!`);
  client.player.stop();
};
module.exports = {
  name: "skip",
  help: "Passa para a próxima música da fila.",
  execute,
};