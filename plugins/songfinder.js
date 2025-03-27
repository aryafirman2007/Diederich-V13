/*
Jangan Hapus Wm Bang 

*Song Finder  Plugins Esm*

Hmm

*[Sumber]*
https://whatsapp.com/channel/0029Vb3u2awADTOCXVsvia28

*[Sumber Scrape]*

ZERvida 
*/

import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

async function FindSong(buffer) {
    const form = new FormData();
    
    form.append('file', buffer, {
        filename: 'file1.mp3',
        contentType: 'audio/mp3'
    });

    form.append('sample_size', buffer.length);

    try {
        const response = await fetch('https://api.doreso.com/humming', {
            method: 'POST',
            headers: {
                ...form.getHeaders(),
                "accept": "application/json, text/plain, */*",
                "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
                "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\"",
                "sec-ch-ua-mobile": "?1",
                "sec-ch-ua-platform": "\"Android\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                "Referer": "https://aha-music.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: form
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return { error: error.message };
    }
}

const handler = async (m, { conn, args, usedPrefix, command }) => {     
    try {
        let buffer;
        
        if (m.quoted && /audio|video/.test(m.quoted.mimetype)) {
            buffer = await m.quoted.download();
        } else if (/https?:\/\//.test(args[0])) {
            const response = await fetch(args[0]);
            if (!response.ok) throw `Gagal mengunduh file dari URL : ${args[0]}`;
            buffer = Buffer.from(await response.arrayBuffer(), 'binary');
        } else {
            return m.reply(`Kirim/reply Audio,Video,Url Audio\n\n*Example :*${usedPrefix}${command} https://qu.ax/CSMYZ.mp4`);
        }
        
m.reply('*Mencari informasi lagu...*');

        const result = await FindSong(buffer);
        
        if (result.error) {
            return m.reply(`${result.error}`);
        }
        
        if (!result.data) {
            return m.reply('Lagunya Gak Ketemu Cba Yang Lain');
        }
        
        const { acrid, artists, title } = result.data;
        
        const formattedResult = `*Song Finder*\n\n` +
                              `*Judul :* ${title}\n` +
                              `*Artis :* ${artists}\n` +
                              `*ID :* ${acrid}`;
        
        m.reply(formattedResult);
        
    } catch (error) {
        m.reply(`${error.message}`);
    }
};

handler.help = ['whatssong'];
handler.command = ['whatssong', 'findsong', 'carilagu'];
handler.tags = ['tools'];

export default handler;