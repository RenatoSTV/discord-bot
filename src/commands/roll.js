function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const execute = (client, msg, args) => {
  let diceNumber = Number(args.join(" "));

  const diceOptions = [4, 8, 10, 12, 20, 100];

  if (diceOptions.includes(diceNumber)) {
    let rollDice = getRandomArbitrary(1, diceNumber);
    rollDice = rollDice.toFixed();

    msg.channel.send(`🎲️ ${rollDice}!`);
  } else {
    msg.channel.send("As opções de dados são: 4, 8, 10 ,12, 20, 100.");
  }
};

module.exports = {
  name: "roll",
  help: "Role um dado.",
  execute,
};
