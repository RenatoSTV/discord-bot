const execute = async (client, msg, args) => {
  const name = encodeURI(args.join(" "));

  return msg.channel.send(`https://br.op.gg/summoners/br/${name.split(" ").join("%20")}/ingame`)
};

module.exports = {
  name: "live",
  help: "Mostra informações da partida ao vivo de um summoner.",
  execute,
};
