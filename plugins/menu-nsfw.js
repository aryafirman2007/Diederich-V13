let handler = async (m) => {

let anu =`╔═━───╍━╍╍┄ *ɴꜱꜰᴡ*
╠➺   .ɴꜱꜰᴡ (ꜰᴜʀʀʏ)  (ⓟ)
╠➺   .ʙᴏᴋᴇᴩ (ꜰᴜʀʀʏ) (ⓛ)
╠➺   .ɴʜᴇɴᴛᴀɪ <ᴄᴏᴅᴇ>  (ⓛ)
╰─── –
╔═━───╍━╍╍┄ *ᴀꜱᴜᴘᴀɴ*
╠➺   .ᴀꜱᴜᴘᴀɴ (ⓛ)
╰─── –
`
await conn.sendMessage(m.chat, {
  text: `${anu}`,
      contextInfo: {
      externalAdReply: {
        title: 'MENU LIST DIEDERICH',
        body: 'D I E D E R I C H  M U L T I D E V I C E',
        thumbnailUrl: 'https://files.catbox.moe/3vz6i3.jpg',
        sourceUrl: 'https://chat.whatsapp.com/LPBLUJReYnIHkkjv8aiPKQ',
        mediaType: 1,
        renderLargerThumbnail: true, 
      }
        }
      }, {
        quoted: m
      });
    }
handler.help = ['menunsfw']
handler.tags = ['info']
handler.command = /^(menunsfw)$/i

export default handler