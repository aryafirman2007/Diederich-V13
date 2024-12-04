import fs from 'fs';
import fetch from 'node-fetch';
let handler = async (m, { conn }) => { 

         let caption = `*Mʏ Gᴄ Oғғɪᴄɪᴀʟ*`;
  conn.reply(m.chat, caption, m, {
      contextInfo: {
        externalAdReply: {
          title: "D I E D E R I C H  M U L T I D E V I C E",
          thumbnailUrl: 'https://files.catbox.moe/g9nndf.jpg',
          sourceUrl: sgc,
          mediaType: 1,
          renderLargerThumbnail: true, 
          showAdAttribution: true
        }
      }
    });
 }
 handler.help = ['gcbot', 'gcDiederich'];
handler.tags = ['main'];
handler.command = /^(gcbot|groupbot|botgc|botgroup|gcDiederich|groupDiederich)$/i;
export default handler;