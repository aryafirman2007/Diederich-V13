/*
- Plugins Play Video (kalo error diulang aja)
- Scrape By: Xyzan Code
- Source: https://whatsapp.com/channel/0029VakezCJDp2Q68C61RH2C
*/
//const axios = require('axios');
//const yts = require('yt-search');
import axios from "axios";
import yts from "yt-search";

const sentMessages = new Set();

const ytdl = async (videoUrl) => {
    try {
        const { data } = await axios.post(
            "https://www.clipto.com/api/youtube",
            { url: videoUrl },
            {
                headers: {
                    "Accept": "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, seperti Gecko) Chrome/134.0.0.0 Mobile Safari/537.36",
                    "Referer": "https://www.clipto.com/id/media-downloader/youtube-downloader",
                },
            }
        );
        return data;
    } catch (error) {
        return { error: "Error", details: error.message };
    }
};

const searchYouTube = async (query) => {
    const searchResults = await yts(query);
    if (!searchResults.videos.length) throw new Error("Video tidak ditemukan.");
    return searchResults.videos[0];
};

const handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!text) return m.reply(`EX: *${usedPrefix + command} Imagination*`);

    if (sentMessages.has(m.key.id)) return;
    sentMessages.add(m.key.id);

    await conn.sendMessage(m.chat, { react: { text: "🍁", key: m.key } });

    try {
        let videoUrl = text;
        let videoDetails = null;

        if (!text.includes("youtu")) {
            try {
                videoDetails = await searchYouTube(text);
                videoUrl = videoDetails.url;
            } catch (error) {
                return m.reply("Gagal mencari video. Coba judul lain.");
            }
        }

        let response = await ytdl(videoUrl);
        if (!response.success) throw new Error("Gagal mendapatkan link download!");

        let { title, thumbnail, medias } = response;
        let video = medias.find((v) => v.quality === "360p") || 
                    medias.find((v) => v.quality === "720p") || 
                    medias.find((v) => v.quality === "1080p");

        if (!video) throw new Error("Tidak ada link video yang tersedia!");

        let details = videoDetails || { title, url: videoUrl, timestamp: "Tidak diketahui", views: "Tidak diketahui", ago: "Tidak diketahui", author: { name: "Tidak diketahui" } };

        let caption = `--- DETAIL VIDEO ---\n` +
                      `Judul: ${details.title}\n` +
                      `Durasi: ${details.timestamp}\n` +
                      `Views: ${details.views}\n` +
                      `Upload: ${details.ago}\n` +
                      `Channel: ${details.author.name}\n` +
                      `Resolusi: ${video.quality}\n` +
                      `Sumber: ${details.url}`;

        await conn.sendMessage(
            m.chat,
            { video: { url: video.url }, caption, mimetype: "video/mp4" },
            { quoted: m }
        );

        await conn.sendMessage(m.chat, { react: { text: "🌸", key: m.key } });

    } catch (error) {
        console.error(error);
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
        m.reply(`Terjadi kesalahan:\n${error.message}`);
    }

    setTimeout(() => sentMessages.delete(m.key.id), 30000);
};

handler.help = ["playvideo"];
handler.tags = ["downloader"];
handler.command = ["playvideo"];

export default handler;
//module.exports = handler;