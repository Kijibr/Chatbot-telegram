const Youtube = require("youtube-node");
const config = require("./yt-config.json");

const youtube = new Youtube();
youtube.setKey(config.key);

function searchVideoURL(message, queryText) {
  return new Promise((resolve, reject) => {
    youtube.search(`Pj Houdini ${queryText}`, 5, function (err, result) {
      if (!err) {
        //cria uma array de videoId e retorna só items validos
        const videoIds = result.items
          .map((item) => item.id.videoId)
          .filter((item) => item);
        const youtubeLinks = videoIds.map(
          (videoId) => `https://www.youtube.com/watch?v=${videoId}`
        );
        resolve(`${message} ${youtubeLinks.join(`, `)}`);
      } else {
          reject('Deu erro na execução');
      }
    });
  });
}

module.exports.searchVideoURL = searchVideoURL;
