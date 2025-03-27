import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { promises as fs } from 'fs';
import gTTS from 'gtts';

const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(__filename);

let handler = async (m, { text, conn }) => {
  if (!text) return m.reply('Mau Tanya Apa');
  
  try {
    // Fix the URL syntax here
    let { data } = await axios.get(`https://fgsi1-restapi.hf.space/api/ai/copilot?text=${encodeURIComponent(text)}`);
    const answer = data?.data?.answer || 'Tidak ada jawaban.';
    
    // Fix the string interpolation for file path
    const gtts = new gTTS(answer, 'id');
    const filePath = `${_dirname}/../tmp/${Date.now()}.mp3`;
    
    await new Promise((resolve, reject) => {
      gtts.save(filePath, async (err) => {
        if (err) {
          await fs.unlink(filePath).catch(() => {});
          reject(err);
          return;
        }
        resolve();
      });
    });
    
    await conn.sendMessage(m.chat, {
      audio: { url: filePath },
      mimetype: 'audio/mpeg',
      ptt: true
    }, { quoted: m });
    
    await fs.unlink(filePath).catch(() => {});
    
  } catch (e) {
    console.error(e);
    m.reply('Terjadi kesalahan saat memproses permintaan.');
  }
};

handler.help = ['copilot'];
handler.command = ['copilot'];
handler.tags = ['ai'];
export default handler;
