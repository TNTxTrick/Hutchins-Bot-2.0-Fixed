const axios = require('axios');
const fs = require('fs');
const gradient = require('gradient-string');
const BASE_URL = 'http://dongdev.click/api/down/media';

module.exports = {
    name: 'atd',
    ver: '1.0',
    prog: 'Jonell Magallanes',

    onEvents: async function ({ api, event, messageID }) {
        if (event.type !== 'message' || event.senderID == api.getCurrentUserID()) return;

        const message = event.body.trim();
        const send = (msg, attachment = []) => api.sendMessage({ body: msg, attachment }, event.threadID, event.messageID);
        const head = app => `[ AUTODOWN - ${app} ]\n────────────────`;

        for (const url of event.args) {
            try {
                if (/^(https:\/\/)(\w+\.)?(facebook|fb)\.(com|watch)\//.test(url)) {
                    await handleFacebookDownload(url, send);
                } else if (/^(https:\/\/)(www\.|m\.)?(tiktok\.com|twitter\.com|youtube\.com|instagram\.com|bilibili\.com|douyin\.com|capcut\.com|threads\.net)\//.test(url)) {
                    const platform = getPlatform(url);
                    await handleOtherPlatformDownload(url, send, platform);
                }
            } catch (error) {
                console.error(`Error handling URL ${url}:`, error);
                send(`Failed to download content from the provided URL.`);
            }
        }
    }
};

// Utility function for downloading a media stream
async function stream(url, ext = 'jpg') {
    try {
        const response = await axios.get(url, { responseType: 'stream' });
        response.data.path = `tmp.${ext}`;
        return response.data;
    } catch (error) {
        console.error(`Failed to download media from ${url}:`, error);
        return null;
    }
}

// Function to handle Facebook downloads
async function handleFacebookDownload(url, send) {
    const res = (await axios.get(`${BASE_URL}?url=${encodeURIComponent(url)}`)).data;
    if (!res.attachments || res.attachments.length === 0) {
        send(`${head('FACEBOOK')}\nNo media found.`);
        return;
    }

    const attachments = await downloadAttachments(res.attachments);
    send(formatMessage('FACEBOOK', res), attachments);
}

// Function to handle other platforms (TikTok, Twitter, etc.)
async function handleOtherPlatformDownload(url, send, platform) {
    const res = (await axios.get(`${BASE_URL}?url=${encodeURIComponent(url)}`)).data;
    if (!res.attachments || res.attachments.length === 0) {
        send(`${head(platform)}\nNo media found.`);
        return;
    }

    const attachments = await downloadAttachments(res.attachments);
    send(formatMessage(platform, res), attachments);
}

// Helper function to download attachments
async function downloadAttachments(attachmentList) {
    return await Promise.all(
        attachmentList.map(async (at) => {
            if (at.type === 'Video') return await stream(at.url, 'mp4');
            if (at.type === 'Photo') return await stream(at.url, 'jpg');
            if (at.type === 'Audio') return await stream(at.url, 'mp3');
            return null;
        })
    ).then(results => results.filter(Boolean)); // Filter out any null values
}

// Helper function to format the message
function formatMessage(platform, res) {
    return `${head(platform)}\n⩺ Tiêu đề: ${res.message || "Không có tiêu đề"}\n${res.like ? `⩺ Lượt thích: ${res.like}\n` : ''}${res.comment ? `⩺ Bình luận: ${res.comment}\n` : ''}${res.share ? `⩺ Chia sẻ: ${res.share}\n` : ''}⩺ Tác giả: ${res.author || "unknown"}`.trim();
}

// Function to determine the platform based on the URL
function getPlatform(url) {
    if (/tiktok\.com/.test(url)) return 'TIKTOK';
    if (/twitter\.com/.test(url)) return 'TWITTER';
    if (/youtube\.com/.test(url)) return 'YOUTUBE';
    if (/instagram\.com/.test(url)) return 'INSTAGRAM';
    if (/bilibili\.com/.test(url)) return 'BILIBILI';
    if (/douyin\.com/.test(url)) return 'DOUYIN';
    if (/threads\.net/.test(url)) return 'THREADS';
    if (/capcut\.com/.test(url)) return 'CAPCUT';
    return 'UNKNOWN';
}
