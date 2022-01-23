const playSong = require("./play").playSong;

const execute = (client, msg, args) => {
  const channel = msg.member.voice.channel;
  
  client.player.pause();
  client.songs.shift();

  playSong(client, msg, client.songs[0]);
};
module.exports = {
  name: "skip",
  help: "Passa para a próxima música da fila.",
  execute,
};
