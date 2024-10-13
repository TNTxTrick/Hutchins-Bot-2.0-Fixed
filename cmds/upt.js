module.exports = {
  name: "upt",
  usedby: 0,
  info: "kiểm tra thời gian hoạt động",
  onPrefix: false,
  cooldowns: 10,

  onLaunch: function ({ api, event }) {
    // Calculate the uptime
    const uptimeInSeconds = process.uptime();
    const hours = Math.floor(uptimeInSeconds / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeInSeconds % 60);

    // Format the uptime message
    const uptimeMessage = `𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻 𝗵𝗼𝗮̣𝘁 đ𝗼̣̂𝗻𝗴 𝗰𝘂̉𝗮 𝗯𝗼𝘁:\n━━━━━━━━━━━━━━━━━━\n🕒 ${hours} giờ, ${minutes} phút, ${seconds} giây`;

    // Send the message
    api.sendMessage(uptimeMessage, event.threadID, event.messageID);
  }
};
