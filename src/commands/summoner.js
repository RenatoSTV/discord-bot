const axios = require("axios");
const dotenv = require('dotenv')

dotenv.config()

const execute = async (client, msg, args) => {
  const name = encodeURI(args.join(" "));

  try {
    const versions = await axios.get(
      `https://ddragon.leagueoflegends.com/api/versions.json`
    );

    const response = await axios.get(
      `${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.LOL_API_TOKEN}`
    );
    let summoner = response.data;

    const profileIconURL = `http://ddragon.leagueoflegends.com/cdn/${versions.data[0]}/img/profileicon/${summoner.profileIconId}.png`;

    let championsMastery = await axios.get(
      `${process.env.LOL_URL}/lol/champion-mastery/v4/champion-masteries/by-summoner/${summoner.id}?api_key=${process.env.LOL_API_TOKEN}`
    );

    let championMastery = championsMastery.data[0];

    const elo = await axios.get(
      `${process.env.LOL_URL}/lol/league/v4/entries/by-summoner/${encodeURI(
        summoner.id
      )}?api_key=${process.env.LOL_API_TOKEN}`
    );

    let list = await axios.get(
      `http://ddragon.leagueoflegends.com/cdn/${versions.data[0]}/data/pt_BR/champion.json`
    );

    let championList = list.data.data;

    let champion = {};

    for (var i in championList) {
      if (championList[i].key == championMastery.championId) {
        champion = championList[i];
      }
    }

    let championImg = `http://ddragon.leagueoflegends.com/cdn/${versions.data[0]}/img/champion/${champion.name}.png`;

    if (elo.data) {
      summoner.elo = elo.data.filter(
        (res) =>
          res.queueType === "RANKED_FLEX_SR" ||
          res.queueType === "RANKED_SOLO_5x5"
      );
    }

    let elosFilds = [];

    elosFilds = summoner.elo.map((res) => {
      if (res.queueType === "RANKED_FLEX_SR") {
        res.queueType = "Flex";
      }

      if (res.queueType === "RANKED_SOLO_5x5") {
        res.queueType = "Solo/Duo";
      }

      return {
        name: res.queueType,
        value: `${res.tier}-${res.rank}\n ${res.leaguePoints} pontos`,
        inline: true,
      };
    });

    const msgEmbeded = {
      title: summoner.name,
      url: `https://br.op.gg/summoners/br/${summoner.name.split(" ").join("%20")}`,
      thumbnail: {
        url: profileIconURL,
      },
      description: `Lvl: ${summoner.summonerLevel}`,
      fields: elosFilds,
    };

    const championEmbed = {
      title: champion.name,
      description: `Lvl: ${championMastery.championLevel}\n ${Number(
        championMastery.championPoints
      ).toLocaleString("pt-BR")} pontos`,
      thumbnail: {
        url: championImg,
      },
    };

    return msg.channel.send({ embeds: [msgEmbeded, championEmbed] });
  } catch (error) {
    if (error.response) {
      console.error(error.response);

      return msg.channel.send("Este summoner não existe.");
    }
  }
};

module.exports = {
  name: "summoner",
  help: "Informações sobre um invocador do lol.",
  execute,
};
