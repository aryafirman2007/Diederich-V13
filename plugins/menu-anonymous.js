let handler = async (m) => {

let anu =`╔═━───╍━╍╍┄ *ᴀɴᴏɴʏᴍᴏᴜꜱ*
╠➺   .ꜱᴛᴀʀᴛ
╠➺   .ʟᴇᴀᴠᴇ
╠➺   .ɴᴇxᴛ
╠➺   .ꜱᴇɴᴅᴋᴏɴᴛᴀᴋ
╚═─━╍╍━╍╾
`
await conn.sendMessage(m.chat, {
  text: `${anu}`,
      contextInfo: {
      externalAdReply: {
        title: 'MENU LIST DIEDERICH',
        body: 'D I E D E R I C H  M U L T I D E V I C E',
        thumbnailUrl: 'https://files.catbox.moe/oqekmw.jpg',
        sourceUrl: 'https://chat.whatsapp.com/LPBLUJReYnIHkkjv8aiPKQ',
        mediaType: 1,
        renderLargerThumbnail: true, 
      }
        }
      }, {
        quoted: m
      });
    }
handler.help = ['menuanonymous']
handler.tags = ['info']
handler.command = /^(menuanonymous)$/i

export default handler