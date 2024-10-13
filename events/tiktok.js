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

        // Download video
        const videoStream = await axios({
            method: 'get',
            url: data.play,
            responseType: 'stream'
        }).then(res => res.data);

        const videoFileName = `TikTok-${Date.now()}.mp4`;
        const videoFilePath = `./${videoFileName}`;
        const videoFile = fs.createWriteStream(videoFilePath);
        videoStream.pipe(videoFile);

        // Download images (assuming data.images is an array of image URLs)
        const imageFilePaths = [];
        const downloadImagePromises = data.images.map((imageUrl, index) => {
            const imageFileName = `TikTok-${Date.now()}-${index}.jpg`;
            const imageFilePath = `./${imageFileName}`;
            imageFilePaths.push(imageFilePath);

            return axios({
                method: 'get',
                url: imageUrl,
                responseType: 'stream'
            }).then(res => {
                const imageFile = fs.createWriteStream(imageFilePath);
                res.data.pipe(imageFile);
                return new Promise((resolve) => {
                    imageFile.on('finish', resolve);
                });
            });
        });

        // Wait for both video and images to be downloaded
        await Promise.all([new Promise((resolve) => videoFile.on('finish', resolve)), ...downloadImagePromises]);

        // Send the video and all images as attachments
        const attachments = [
            fs.createReadStream(videoFilePath),
            ...imageFilePaths.map(filePath => fs.createReadStream(filePath))
        ];

        api.sendMessage({
            body: `𝗧𝗶𝗸𝘁𝗼𝗸 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗿 𝗔𝘂𝘁𝗼\n━━━━━━━━━━━━━━━━━━\n\n𝙲𝚘𝚗𝚝𝚎𝚗𝚝: ${data.title}\n\n𝙻𝚒𝚔𝚎𝚜: ${data.digg_count}\n\n𝙲𝚘𝚖𝚖𝚎𝚗𝚝𝚜: ${data.comment_count}`,
            attachment: attachments
        }, threadID, () => {
            // Clean up downloaded files
            fs.unlinkSync(videoFilePath);
            imageFilePaths.forEach(filePath => fs.unlinkSync(filePath));
        }, messageID);

    } catch (e) {
        console.log(e);
    }
}
