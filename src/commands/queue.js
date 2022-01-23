const execute = (client, msg, args) => {
  const channel = msg.member.voice.channel;

  
  console.log(client.songs)
};
module.exports = {
  name: "queue",
  help: "Lista de reprodução.",
  execute,
};
