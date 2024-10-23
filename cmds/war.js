module.exports = {
  name: "war",
  usedby: 0,
  info: "Gửi tin nhắn liên tục",
  onPrefix: false,
  cooldowns: 10,

  onLaunch: async function ({ api, event }) {
    const message = "Tin nhắn liên tục...";
    const interval = 500; // 5 giây giữa mỗi tin nhắn
    const maxMessages = 5;  // Gửi 5 tin nhắn

    for (let i = 0; i < maxMessages; i++) {
      api.sendMessage(`${message} - Lần ${i + 1}`, event.threadID, (err) => {
        if (err) {
          console.error("Error sending message:", err);
        } else {
          console.log(`Message ${i + 1} sent successfully!`);
        }
      });
      await delay(interval); // Chờ 5 giây trước khi gửi tiếp
    }
  }
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
