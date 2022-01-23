const execute = (client, msg, args) => {
  console.log(client.songs);
};
module.exports = {
  name: "queue",
  help: "Lista de reprodução.",
  execute,
};
