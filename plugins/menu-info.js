let handler = async (m) => {

let anu =`╔═━───╍━╍╍┄ *ɪɴꜰᴏ*
╠➺   .ᴄᴇᴋɪᴅᴄʜ 
╠➺   .ᴏᴡɴᴇʀ
╠➺   .ᴄʀᴇᴀᴛᴏʀ
╠➺   .ᴜꜱᴇʀ
╠➺   .ʙᴏᴛꜱᴛᴀᴛᴜꜱ
╠➺   .ɢᴀᴍᴇ
╠➺   .ɢᴇᴍᴘᴀ
╠➺   .ʀᴇᴘᴏʀᴛ <ᴛᴇᴋꜱ>
╠➺   .ʀᴇqᴜᴇꜱᴛ <ᴛᴇᴋꜱ>
╠➺   .ʀᴜɴᴛɪᴍᴇ
╠➺   .ꜱᴄʀɪᴘᴛ
╠➺   .ᴛᴇꜱᴛꜱᴘᴇᴇᴅ
╠➺   .ᴛqᴛᴏ
╠➺   .ᴄʀᴇᴅɪᴛ
╠➺   .ʙᴀɴɴᴇᴅʟɪꜱᴛ
╠➺   .ʟɪꜱᴛɢᴄ
╠➺   .ᴘʀᴏꜰɪʟᴇ [@ᴜꜱᴇʀ]
╠➺   .ᴘʀᴇᴍʟɪꜱᴛ [ᴀɴɢᴋᴀ]
╠➺   .ᴘʀᴏꜰɪʟᴇ (ⓛ)
╠➺   .ᴘʀᴏꜰɪʟᴇ *⧼@ᴜꜱᴇʀ⧽* (ⓛ)
╠➺   .ʀᴏʟᴇ
╠➺   .ꜱᴇʀᴠᴇʀ
╠➺   .ᴘɪɴɢ
╠➺   .ꜱᴘᴇᴇᴅ
╠➺   .ᴠᴇʀꜱɪᴏɴ
╚═─━╍╍━╍╾
╔═━───╍━╍╍┄ *ᴍᴇɴᴜ*
╠➺   .ᴍᴇɴᴜ
╚═─━╍╍━╍╾
`
await conn.sendMessage(m.chat, {
  text: `${anu}`,
      contextInfo: {
      externalAdReply: {
        title: 'MENU LIST DIEDERICH',
        body: 'D I E D E R I C H  M U L T I D E V I C E',
        thumbnailUrl: 'https://files.catbox.moe/frfxvk.jpg',
        sourceUrl: 'https://chat.whatsapp.com/LnEShOfN7fF6xL62EAUuG9',
        mediaType: 1,
        renderLargerThumbnail: true, 
      }
        }
      }, {
        quoted: m
      });
    }
handler.help = ['menuinfo']
handler.tags = ['info']
handler.command = /^(menuinfo)$/i

export default handler