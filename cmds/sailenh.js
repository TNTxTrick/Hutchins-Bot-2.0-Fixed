const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "cos",
  usedby: 0,
  onPrefix: true,
  dev: "tnt",
  cooldowns: 5,

  onLaunch: async function ({ api, event }) {
    try {
      const response = await axios.get(
        `https://ccexplorerapisjonell.vercel.app/api/tiktok/searchvideo?keywords=yuzuki_cosplay07`
      );
      const videos = response.data.data.videos;

      if (!videos || videos.length === 0) {
        api.sendMessage("No videos found for the given search query.", event.threadID);
        return;
      }

      const videoData = videos[0];
      const videoUrl = videoData.play;
      const message = `Video cosplay`;

      const filePath = path.join(__dirname, `/cache/tiktok_video.mp4`);
      const writer = fs.createWriteStream(filePath);
      const videoResponse = await axios({
        method: "get",
        url: videoUrl,
        responseType: "stream",
      });

      videoResponse.data.pipe(writer);

      writer.on("finish", () => {
        api.sendMessage(
          {
            body: message,
            attachment: fs.createReadStream(filePath),
          },
          event.threadID,
          (err, sMessageInfo) => {
            if (err) {
              console.error("Error sending the message:", err);
            }
            // Delete the file after sending
            fs.unlinkSync(filePath);
          }
        );
      });

      writer.on("error", (err) => {
        console.error("Error writing the file:", err);
        api.sendMessage("Failed to download the video.", event.threadID);
        // Clean up in case of an error
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });

    } catch (error) {
      console.error("Error:", error);
      api.sendMessage("An error occurred while processing the request.", event.threadID);
    }
  },
};
