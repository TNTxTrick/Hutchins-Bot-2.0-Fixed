const axios = require('axios');

module.exports = {
  name: "spamsms",
  usedby: 0,
  info: "gửi thông báo đến số",
  onPrefix: false,
  cooldowns: 10,

  onLaunch: function ({ api, event }) {
    const args = event.body.trim().split(" ");
    if (args.length < 2) {
      return api.sendMessage("Vui lòng nhập số điện thoại. Ví dụ: spamsms 0123456789", event.threadID, event.messageID);
    }

    const phone = args[1];

    axios.post("https://fptshop.com.vn/api-data/loyalty/Home/Verification",
      new URLSearchParams({ phone: phone }).toString(),
      {
        headers: {
          "Host": "fptshop.com.vn",
          "Accept": "*/*",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
          "Origin": "https://fptshop.com.vn",
          "Referer": "https://fptshop.com.vn/",
          "Accept-Encoding": "gzip, deflate, br"
        }
      }
    )
    .then(response => {
      api.sendMessage(`Gửi thông báo thành công đến số ${phone}`, event.threadID, event.messageID);
    })
    .catch(error => {
      api.sendMessage(`Gửi thông báo thất bại: ${error.message}`, event.threadID, event.messageID);
    });
  }
};
