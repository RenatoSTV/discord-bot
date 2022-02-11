const axios = require("axios");
const { lolAPItoken, lolURL } = require("../../config.json");

const execute = async (client, msg, args) => {
  const name = encodeURI(args.join(" "));

  try {
    const response = await axios.get(
      `${lolURL}/lol/summoner/v4/summoners/by-name/${name}?api_key=${lolAPItoken}`
    );
    const summoner = response.data;

    searchMatch(summoner, msg, args);
  } catch (error) {
    console.error(error);
  }
};

const searchMatch = async (summoner, msg, args) => {
  try {
    const live = await axios.get(
      `${lolURL}/lol/spectator/v4/active-games/by-summoner/${encodeURI(
        summoner.id
      )}?api_key=${lolAPItoken}`
    );

    console.log(live);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  name: "live",
  help: "Mostra informações da partida ao vivo de um summoner.",
  execute,
};
