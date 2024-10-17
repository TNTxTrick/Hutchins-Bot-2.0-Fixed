const axios = require('axios');

module.exports = {
  name: "proxy",
  usedby: 0,
  info: "gửi thông báo đến số",
  onPrefix: false,
  cooldowns: 10,

  onLaunch: async function ({ api, event }) {
    try {
      const response = await axios.get('https://api-scanproxy.onlitegix.com/api/proxy');
      const { link } = response.data; // Adjust according to the actual data structure

      if (link) { // Check if link is present
        api.sendMessage(`${link}`, event.threadID);
      } else {
        api.sendMessage('Không tìm thấy proxy nào.', event.threadID);
      }
    } catch (error) {
      console.error('Lỗi khi lấy proxy:', error);
      api.sendMessage('Không thể lấy proxy. Vui lòng thử lại sau.', event.threadID);
    }
  },
};
