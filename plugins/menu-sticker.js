let handler = async (m) => {

let anu =`╔═━───╍━╍╍┄ *ꜱᴛɪᴄᴋᴇʀ*
╠➺   .ᴀᴛᴛᴘ <ᴛᴇᴋꜱ> (ⓛ)
╠➺   .ꜱᴛɪᴋᴇʀᴛᴇʟᴇɢʀᴀᴍ <ᴜʀʟ> (ⓛ) (ⓟ)
╠➺   .qᴄ (ⓛ)
╠➺   .ʙᴏɴᴋ @ᴜꜱᴇʀ
╠➺   .ʙᴏɴᴋ
╠➺   .ᴄᴏʟᴏɴɢ <ʀᴇᴘʟʏ ꜱᴛɪᴄᴋᴇʀ>
╠➺   .ᴄᴏʟᴏɴɢ <ʀᴇᴘʟʏ ɢᴀᴍʙᴀʀ>
╠➺   .ᴄᴏʟᴏɴɢ <ᴜʀʟ/ʟɪɴᴋ>
╠➺   .ᴇᴍᴏᴊɪ
╠➺   .ᴇᴍᴏᴊɪᴍɪx
╠➺   .ɢᴇᴛᴇxɪꜰ
╠➺   .ꜱᴍᴇᴍᴇ
╠➺   .ᴛᴏᴠɪᴅᴇᴏ
╠➺   .ᴡᴍ <ᴘᴀᴄᴋɴᴀᴍᴇ>|<ᴀᴜᴛʜᴏʀ>
╠➺   .ᴄᴀʀɪꜱᴛɪᴋᴇʀ <qᴜᴇʀʏ>
╰─── –
╔═━───╍━╍╍┄ *ɢᴇɴᴇʀᴀʟ*
╠➺   .ꜱᴛɪᴋᴇʀ
╠➺   .ᴛᴏɪᴍɢ
╰─── –
`
await conn.sendMessage(m.chat, {
  text: `${anu}`,
      contextInfo: {
      externalAdReply: {
        title: 'MENU LIST DIEDERICH',
        body: 'D I E D E R I C H  M U L T I D E V I C E',
        thumbnailUrl: 'https://files.catbox.moe/37ixux.jpg',
        sourceUrl: 'https://chat.whatsapp.com/LnEShOfN7fF6xL62EAUuG9',
        mediaType: 1,
        renderLargerThumbnail: true, 
      }
        }
      }, {
        quoted: m
      });
    }
handler.help = ['menusticker']
handler.tags = ['info']
handler.command = /^(menusticker)$/i

export default handler