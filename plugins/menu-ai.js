let handler = async (m) => {

let anu =`
# *MENU ARTIFICIAL INTELLIGENCE* #
╔═━───╍━╍╍┄
╠➺   .ᴀɪɪᴍᴀɢᴇ (ⓛ)
╠➺   .ᴀɪᴠᴏɪᴄᴇ
╠➺   .ᴀɪ
╠➺   .ᴏᴘᴇɴᴀɪ
╠➺   .ɢᴘᴛ
╠➺   .ᴅɪꜰꜰᴜꜱɪᴏɴ (ⓛ)
╠➺   .ɢᴇᴍɪɴɪ
╠➺   .ʙᴀʀᴅ
╠➺   .ᴛᴏᴀɴɪᴍᴇ  (ⓟ)
╠➺   .ᴊᴀᴅɪᴀɴɪᴍᴇ  (ⓟ)
╠➺   .ᴊᴀᴅɪᴢᴏᴍʙɪᴇ (ⓛ) (ⓟ)
╠➺   .ʟᴜᴍɪɴᴀɪ
╠➺   .ʀᴇᴍɪɴɪ (ⓛ)
╠➺   .ᴄᴏʟᴏʀ (ⓛ)
╠➺   .ʜᴅʀ (ⓛ)
╠➺   .ʜᴅ (ⓛ)
╠➺   .ʜᴅ (ⓛ)
╠➺   .ᴛxᴛ2ɪᴍɢ
╠➺   .ᴠᴏɪᴄᴇᴠᴏx (ⓛ)
╚═─━╍╍━╍╾
╔═━───╍━╍╍┄ *ᴄʜᴀʀᴀᴄᴛᴇʀ-ᴀɪ*
╠➺   .ᴅᴇʀɪᴄʜ
╠➺   .ꜱʜᴜᴄʜɪ
╠➺   .ᴛʜᴇᴏ
╠➺   .ɢʀᴀɴᴛʟʏ
╠➺   .ᴏꜱᴄᴀʀ
╠➺   .ᴄᴀɪʜᴜᴛᴀᴏ
╠➺   .ᴀɪʜᴜᴛᴀᴏ
╠➺   .ᴄᴀɪᴅɪᴇᴅᴇʀɪᴄʜ
╠➺   .ᴄᴀɪᴍɪᴋᴜ
╠➺   .ᴄᴀɪᴍɪᴋᴀ
╠➺   .ᴄᴀɪʏᴜᴜᴋᴀ
╠➺   .ᴄᴀɪɴᴇᴢᴜᴋᴏ
╠➺   .ᴄᴀɪɴᴏʙᴀʀᴀ
╠➺   .ᴄᴀɪ
╠➺   .ᴀɪᴅɪᴇᴅᴇʀɪᴄʜ
╚═─━╍╍━╍╾
`
await conn.sendMessage(m.chat, {
  text: `${anu}`,
      contextInfo: {
      externalAdReply: {
        title: 'MENU LIST DIEDERICH',
        body: 'D I E D E R I C H  M U L T I D E V I C E',
        thumbnailUrl: 'https://files.catbox.moe/owhfw4.jpg',
        sourceUrl: 'https://chat.whatsapp.com/DmZ8Ei3ywT4ETE5zxJSfqH',
        mediaType: 1,
        renderLargerThumbnail: true, 
      }
        }
      }, {
        quoted: m
      });
    }
handler.help = ['menuai']
handler.tags = ['info']
handler.command = /^(menuai)$/i

export default handler