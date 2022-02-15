const axios = require("axios");
const { version } = require("moment");
const moment = require("moment");
moment.locale("pt-br");
const { lolAPItoken, lolURL } = require("../../config.json");

const execute = async (client, msg, args) => {
  const name = encodeURI(args.join(" "));

  try {
    const response = await axios.get(
      `${lolURL}/lol/summoner/v4/summoners/by-name/${name}?api_key=${lolAPItoken}`
    );
    const summoner = response.data;

    searchMatchs(summoner, msg, args);
  } catch (error) {
    console.error(error);
  }
};

const searchMatchs = async (summoner, msg, args) => {
  try {
    const versions = await axios.get(
      `https://ddragon.leagueoflegends.com/api/versions.json`
    );

    const matchs = await axios.get(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?count=5&api_key=${lolAPItoken}`
    );

    const games = await Promise.all(
      matchs.data.map(async (id) => {
        const info = await axios.get(
          `https://americas.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${lolAPItoken}`
        );

        return info.data;
      })
    );

    let matchsInfos = games.map((game) => {
      return game.info;
    });

    let gamesparticipants = games.map((game) => {
      return game.info.participants;
    });

    let playerInfos = gamesparticipants.map((infos) => {
      return infos.find((info) => {
        return info.puuid === summoner.puuid;
      });
    });

    let matchsFields = [];

    matchsFields = playerInfos.map((partida, index) => {
      const date = moment(matchsInfos[index].gameEndTimestamp).format(
        "DD/MM - H:mm"
      );
      let championImg = `http://ddragon.leagueoflegends.com/cdn/${versions.data[0]}/img/champion/${partida.championName}.png`;
      return {
        color: partida.win ? "GREEN" : "RED",
        url: `https://www.leagueofgraphs.com/pt/match/br/${matchsInfos[index].gameId}`,
        title: `${partida.win ? "Vitória" : "Derrota"} - ${
          matchsInfos[index].gameMode
        }\n${date}`,
        thumbnail: {
          url: championImg,
        },
        description: `Champion: ${partida.championName} | Role: ${partida.role} | KDA: ${partida.kills}/${partida.assists}/${partida.deaths}`,
      };
    });

    return msg.channel.send({ embeds: matchsFields });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  name: "partidas",
  help: "lista de partidas recentes de um summoner.",
  execute,
};
