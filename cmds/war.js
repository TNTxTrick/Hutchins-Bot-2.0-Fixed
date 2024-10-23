const axios = require('axios');

module.exports = {
  name: "war",
  usedby: 0,
  info: "Gửi tin nhắn liên tục",
  onPrefix: false,
  cooldowns: 10,

  onLaunch: async function ({ api, event }) {
    const message = "Có hoa trong họ Geometridae và các bạn có thể lỡ lời khuyên dùng...";
    const interval = 1000; // 5 seconds between each message (adjust as needed)
    const maxMessages = 10; // Stop after sending 10 messages (set your limit)

    for (let i = 0; i < maxMessages; i++) {
      api.sendMessage(message);
      await delay(interval); // Wait for the specified interval before sending the next message
    }
  }
};

// Helper function to add a delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
