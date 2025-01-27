let handler = async (m) => {

let anu =`
*MENU ISLAMI*
╔═━───╍━╍╍┄ *ɪꜱʟᴀᴍɪ*
╠➺   .ᴀʟqᴜʀᴀɴ <114> <1>
╠➺   .qᴜᴏᴛᴇꜱɪꜱʟᴀᴍɪ (ⓛ)
╰─── –
╔═━───╍━╍╍┄ *qᴜʀᴀɴ*
╠➺   .ᴀꜱᴍᴀᴜʟʜᴜꜱɴᴀ [1-99]
╠➺   .ᴋɪꜱᴀʜɴᴀʙɪ <ɴᴀᴍᴇ> (ⓛ)
╠➺   .ꜱᴀʟᴀᴛ <ᴅᴀᴇʀᴀʜ>
╠➺   .ɴɪᴀᴛꜱʜᴏʟᴀᴛ
╠➺   .ᴀʏᴀᴛᴋᴜʀꜱɪ (ⓛ)
╰─── –
`
await conn.sendMessage(m.chat, {
  text: `${anu}`,
      contextInfo: {
      externalAdReply: {
        title: 'MENU LIST DIEDERICH',
        body: 'D I E D E R I C H  M U L T I D E V I C E',
        thumbnailUrl: 'https://files.catbox.moe/ccc1ei.jpg',
        sourceUrl: 'https://chat.whatsapp.com/LnEShOfN7fF6xL62EAUuG9',
        mediaType: 1,
        renderLargerThumbnail: true, 
      }
        }
      }, {
        quoted: m
      });
    }
handler.help = ['menuislami']
handler.tags = ['info']
handler.command = /^(menuislami)$/i

export default handler