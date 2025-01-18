let handler = async (m) => {

let anu =` ╔═━───╍━╍╍┄ *ᴍᴀɪɴ*
╠➺   @ᴠᴇʀɪꜰʏ
╠➺   .ᴀꜰᴋ [ᴀʟᴀꜱᴀɴ]
╠➺   .ᴅᴀꜰᴛᴀʀ
╠➺   .ᴅᴏɴᴀꜱɪ
╠➺   .ᴊᴀᴅɪᴀɴ
╠➺   .ɢᴄʙᴏᴛ
╠➺   .ɢᴄᴅɪᴇᴅᴇʀɪᴄʜ
╠➺   .ᴅᴀꜱʜʙᴏᴀʀᴅ (ⓛ)
╠➺   .ᴅᴀꜱʜ (ⓛ)
╠➺   .ᴠɪᴇᴡꜱ (ⓛ)
╠➺   .ᴛᴏᴛᴀʟꜰᴇᴀᴛᴜʀᴇ
╠➺   .ᴄᴇᴋꜱɴ
╠➺   .ʟɪᴍɪᴛ [@ᴜꜱᴇʀ]
╠➺   ᴍᴏᴅᴇ
╠➺   .ɴᴏᴡᴀ <ɴᴜᴍʙᴇʀ>
╠➺   .ᴏʀᴅᴇʀ
╠➺   .ᴘʀᴏꜰɪʟᴇ (ⓛ)
╠➺   .ᴘʀᴏꜰɪʟᴇ *⧼@ᴜꜱᴇʀ⧽* (ⓛ)
╠➺   .ɢᴇᴛᴍꜱɢ
╠➺   .ᴜɴʀᴇɢ
╰─── –
`
await conn.sendMessage(m.chat, {
  text: `${anu}`,
      contextInfo: {
      externalAdReply: {
        title: 'MENU LIST DIEDERICH',
        body: 'D I E D E R I C H  M U L T I D E V I C E',
        thumbnailUrl: 'https://files.catbox.moe/2y0bm7.jpg',
        sourceUrl: 'https://chat.whatsapp.com/DmZ8Ei3ywT4ETE5zxJSfqH',
        mediaType: 1,
        renderLargerThumbnail: true, 
      }
        }
      }, {
        quoted: m
      });
    }
handler.help = ['menuuser']
handler.tags = ['info']
handler.command = /^(menuuser)$/i

export default handler