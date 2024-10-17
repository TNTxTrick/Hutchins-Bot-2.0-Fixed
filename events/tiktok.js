const axios = require('axios');
const fs = require('fs');
const gradient = require('gradient-string');
module.exports = {
    name: 'tiktokauto',
    ver: '1.0',
    prog: 'Jonell Magallanes',

    onEvents: async function ({ api, event, messageID }) {
        if (event.type === 'message') {
            const message = event.body.trim();
            const tiktokLinkRegex = /https:\/\/(www\.|vt\.)?tiktok\.com\/\S*/;

            if (tiktokLinkRegex.test(message)) {
                await downloadAndSendTikTokContent(message, api, event.threadID, event.messageID);
                console.log(gradient.morning(`Tiktok Downloader Executed`));
            }
        }
    }
};

async function downloadAndSendTikTokContent(url, api, threadID, messageID) {
    try {
        const response = await axios.post(`https://www.tikwm.com/api/`, { url: url });
        const data = response.data.data;

        const videoStream = await axios({
            method: 'get',
            url: data.play,
            responseType: 'stream'
        }).then(res => res.data);

        const fileName = `TikTok-${Date.now()}.mp4`;
        const filePath = `./${fileName}`;
        const videoFile = fs.createWriteStream(filePath);

        videoStream.pipe(videoFile);

        videoFile.on('finish', () => {
            videoFile.close(() => {
                console.log('Downloaded TikTok video file.');

                api.sendMessage({
                    body: ` TikTok\n━━━━━━━━━━━━━━━━━━\n\nTiêu đề: ${data.title}\n\nLượt thích: ${data.digg_count}\n\nBình luận: ${data.comment_count}`,
                    attachment: fs.createReadStream(filePath)
                }, threadID, () => {
                    fs.unlinkSync(filePath);
                }, messageID);
            });
        });
    } catch (e) {
        console.log(e);
    }
}
