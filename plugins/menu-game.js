let handler = async (m) => {

let anu =`╔═━───╍━╍╍┄ *ɢᴀᴍᴇ*
╠➺   .ʙᴏᴍʙ
╠➺   .ᴄʜᴇꜱꜱ [ᴅᴀʀɪ ᴋᴇ]
╠➺   .ᴄʜᴇꜱꜱ ᴅᴇʟᴇᴛᴇ
╠➺   .ᴄʜᴇꜱꜱ ᴊᴏɪɴ
╠➺   .ᴄʜᴇꜱꜱ ꜱᴛᴀʀᴛ
╠➺   .ʙᴏɴᴀɴᴢᴀ
╠➺   .ᴄᴀᴋʟᴏɴᴛᴏɴɢ
╠➺   .ꜰᴀᴍɪʟʏ100
╠➺   .ᴍᴀᴛʜ <ᴍᴏᴅᴇ>
╠➺   .ᴘᴘᴛ <ʀᴏᴄᴋ/ᴘᴀᴘᴇʀ/ꜱᴄɪꜱꜱᴏʀꜱ>
╠➺   .ꜱɪᴀᴘᴀᴋᴀʜᴀᴋᴜ
╠➺   .ꜱᴘɪɴ
╠➺   .ꜱᴜꜱᴜɴᴋᴀᴛᴀ
╠➺   .ᴛᴇʙᴀᴋɢᴀᴍʙᴀʀ
╠➺   .ᴀᴛᴛᴀᴄᴋ
╠➺   .ᴀᴛᴋ
╠➺   .ᴡᴀʀ
╠➺   .ᴛᴇʙᴀᴋᴋᴀᴛᴀ
╠➺   .ᴛɪᴄᴛᴀᴄᴛᴏᴇ [ᴄᴜꜱᴛᴏᴍ ʀᴏᴏᴍ ɴᴀᴍᴇ]
╠➺   .ᴛᴛᴛ [ᴄᴜꜱᴛᴏᴍ ʀᴏᴏᴍ ɴᴀᴍᴇ]
╠➺   .ꜰɪɢʜᴛᴄᴇɴᴛᴀᴜʀ (ⓛ)
╠➺   .ꜰɪɢʜᴛɢʀɪꜰꜰɪɴ (ⓛ)
╠➺   .ꜰɪɢʜᴛᴋᴜᴄɪɴɢ (ⓛ)
╠➺   .ꜰɪɢʜᴛᴋʏᴜʙɪ (ⓛ)
╠➺   .ꜰɪɢʜᴛɴᴀɢᴀ (ⓛ)
╠➺   .ꜰɪɢʜᴛᴘʜᴏɴɪx (ⓛ)
╠➺   .ʜᴜɴᴛ (ⓛ)
╠➺   .ᴘᴏʟɪꜱɪ
╠➺   .ᴘᴏʟɪꜱɪ ᴄᴀʀɪ
╠➺   .ᴘᴏʟɪꜱɪ ꜱᴛᴀᴛᴜꜱ
╠➺   .ᴘᴏʟɪꜱɪ ɪᴛᴇᴍ <ɪᴛᴇᴍ>
╠➺   .ᴘᴏʟɪꜱɪ ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅ
╠➺   .ᴘᴏʟɪꜱɪ ꜱᴛᴏᴘ
╠➺   .ꜱʟᴏᴛ
╠➺   .ᴊᴀᴄᴋᴘᴏᴛ
╠➺   .ꜱʟᴏᴛ
╠➺   .ᴡᴡ
╠➺   .ᴡᴡᴊᴏɪɴ
╠➺   .ᴡᴡʟᴇꜰᴛ
╠➺   .ᴡᴡᴘʟᴀʏᴇʀ
╠➺   .ᴡᴡꜱᴛᴀʀᴛ
╚═─━╍╍━╍╾
`
await conn.sendMessage(m.chat, {
  text: `${anu}`,
      contextInfo: {
      externalAdReply: {
        title: 'MENU LIST DIEDERICH',
        body: 'D I E D E R I C H  M U L T I D E V I C E',
        thumbnailUrl: 'https://files.catbox.moe/nstwyf.jpg',
        sourceUrl: 'https://chat.whatsapp.com/LnEShOfN7fF6xL62EAUuG9',
        mediaType: 1,
        renderLargerThumbnail: true, 
      }
        }
      }, {
        quoted: m
      });
    }
handler.help = ['menugame']
handler.tags = ['info']
handler.command = /^(menugame)$/i

export default handler