const {
  joinVoiceChannel,
  createAudioPlayer,
  NoSubscriberBehavior,
  AudioPlayerStatus,
  AudioPlayer,
  createAudioResource,
  StreamType,
} = require("@discordjs/voice");
const ytSearch = require("yt-search");
const ytdl = require("ytdl-core-discord");

const execute = async (client, msg, args) => {
  const channel = msg.member.voice.channel;
  let search = args.join(" ");

  try {
    ytSearch(search, (err, result) => {
      if (err) {
        throw err;
      } else if (result && result.videos.length > 0) {
        const song = result.videos[0];
        const songs = client.songs;
        songs.push(song);
        console.log(songs)
        songs.length == 1 && playSong(client, msg, song);
      } else {
        return msg.reply("desculpe, não encontrei o que você desejava!");
      }
    });
  } catch (e) {
    console.error(e);
  }

  const playSong = async (client, msg, song) => {
    const songs = client.songs;
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    let stream = await ytdl(song.url, {
      highWaterMark: 1 << 25,
      filter: "audioonly",
    });

    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
      },
    });
    const resource = createAudioResource(stream, {
      inputType: StreamType.Opus,
    });

    player.play(resource);
    connection.subscribe(player);
    client.player = player;
  };
};
module.exports = {
  name: "play",
  help: "Busca e executa uma música.",
  execute,
};
