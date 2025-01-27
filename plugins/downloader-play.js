/**
 * Nama: Plugin Play Youtube
 * Copyright: © 2025 ALVIAN UXIO
 * [ DELETE WM IS FORBIDDEN ]
 * Source WA: https://whatsapp.com/channel/0029VaAQKcJEquiQVH2RM10U
 */
import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return m.reply(`Gunakan format:\n${usedPrefix + command} <judul/lagu>`);
  }

  const query = args.join(' ');
  m.reply('Mohon tunggu sebentar...');
  const apiUrl = `https://api.alvianuxio.my.id/api/play?query=${encodeURIComponent(query)}&format=mp3&apikey=aluxi`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.data || !result.data.response) {
      return m.reply('Lagu tidak ditemukan. Coba cari dengan judul yang lebih spesifik.');
    }

    const song = result.data.response;
    await m.reply(`
Judul: ${song.title}
Durasi: ${song.duration}
Upload: ${song.uploadDate}
Channel: ${song.channel.name}
Views: ${song.views.toLocaleString()}
Url: ${song.videoUrl}
Thumbnail: ${song.image}
    `);
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: song.downloadUrl },
        mimetype: 'audio/mpeg',
        fileName: `${song.title}.mp3`,
      },
      { quoted: m }
    );
  } catch (error) {
    console.error('Error:', error.message);
    m.reply('Terjadi kesalahan saat mengambil data lagu. Coba lagi nanti.');
  }
};

handler.help = ["play"].map((v) => v + " <judul lagu>");
handler.tags = ["music"];
handler.command = ["play"];
export default handler;

/**
 * Nama: Plugin Play Youtube
 * Copyright: © 2025 ALVIAN UXIO
 * [ DELETE WM IS FORBIDDEN ]
 * Source WA: https://whatsapp.com/channel/0029VaAQKcJEquiQVH2RM10U
 */
