/*
Jangan Hapus Wm Bang 

*Snackvid Down  Plugins Esm*

Hmmph

*[Sumber]*
https://whatsapp.com/channel/0029Vb3u2awADTOCXVsvia28

*[Sumber Scrape]*

https://whatsapp.com/channel/0029VaGqCO6I1rcjc9hisJ3U/1820
*/

import axios from 'axios';
import cheerio from 'cheerio';

class SnackVideo {
    constructor(url) {
        this.url = url;
    }

    getScript(html) {
        const $ = cheerio.load(html);
        let data = [];
        $("script").each((_, a) => {
            data.push($(a).html());
        });
        return data[5];
    }

    decodeUnicode(str) {
        return str.replace(/\\u(\w{4})/g, (match, group) => String.fromCharCode(parseInt(group, 16)));
    }

    async fetchData() {
        const { data: html } = await axios.get(this.url);
        const getScript = this.getScript(html);

        const _contentUrl = getScript.split('contentUrl:"');
        return this.decodeUnicode(_contentUrl[1].split('",commentUrl:"')[0]);
    }
}

const handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Mana Url Snack Video Nya\n\n*Example :* .sv https://www.snackvideo.com/@kwai/video/5202370628555172539');

    try {
        m.reply('Please Wait...');

        const snackVideo = new SnackVideo(text);
        const videoUrl = await snackVideo.fetchData();

        await conn.sendMessage(m.chat, {
            video: { url: videoUrl },
            mimetype: 'video/mp4'
        }, { quoted: m });

    } catch (error) {
        console.error(error);
        m.reply('Error processing the SnackVideo link. Make sure the URL is correct and try again.');
    }
};

handler.help = ['snackvideo <url>'];
handler.tags = ['downloader'];
handler.command = /^(snackvideo|sv)$/i;

export default handler;