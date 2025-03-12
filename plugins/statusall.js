import uploadImage from '../lib/uploadImage.js'
import { default as baileys } from "@adiwajshing/baileys";

if (!baileys?.proto?.Message?.ProtocolMessage?.Type?.STATUS_MENTION_MESSAGE) {
  throw new Error("no STATUS_MENTION_MESSAGE found in ProtocolMessage (is your WAProto up-to-date?)");
}

// Function to fetch participants of groups
const fetchParticipants = async (conn, ...jids) => {
  let results = [];
  for (const jid of jids) {
    let { participants } = await conn.groupMetadata(jid);
    participants = participants.map(({ id }) => id);
    results = results.concat(participants);
  }
  return results;
};

async function mentionStatus(conn, jids, content) {
    let colors = ['#7ACAA7', '#6E257E', '#5796FF', '#7E90A4', '#736769', '#57C9FF', '#25C3DC', '#FF7B6C', '#55C265', '#FF898B', '#8C6991', '#C69FCC', '#B8B226', '#EFB32F', '#AD8774', '#792139', '#C1A03F', '#8FA842', '#A52C71', '#8394CA', '#243640'];
    let fonts = [0, 1, 2, 6, 7, 8, 9, 10];

    let users = [];
    for (let id of jids) {
        let userId = await conn.groupMetadata(id);
        users.push(...userId.participants.map(u => conn.decodeJid(u.id)));
    }

    let message = await conn.sendMessage(
        "status@broadcast", 
        content, 
        {
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            font: fonts[Math.floor(Math.random() * fonts.length)],
            statusJidList: users
        }
    );

    jids.forEach(id => {
        conn.relayMessage(
            id, 
            {
                groupStatusMentionMessage: {
                    message: {
                        protocolMessage: {
                            key: message.key,
                            type: 25,
                        },
                    },
                },
            },
            {
                userJid: conn.user.jid
            }
        );
    });
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  
  if (command === 'upswimage' || command === 'upswvideo' || command === 'upswaudio') {
    if (!mime) throw 'No media found';
    let media = await q.download();
    let isImageOrVideo = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    let isAudio = /audio\/(mp3|ogg|m4a)/.test(mime);
    
    if (!isImageOrVideo && !isAudio) throw 'Unsupported media type';

    let link = await uploadImage(media);
    let content = {};

    if (command === 'upswimage') {
      content.image = { url: link };
      content.caption = text || '';
    } else if (command === 'upswvideo') {
      content.video = { url: link };
      content.caption = text || '';
    } else if (command === 'upswaudio') {
      content.audio = { url: link };
    }

    await mentionStatus(conn, [m.chat], content);
  }

  if (command === 'upswtext') {
    await mentionStatus(conn, [m.chat], { text: text });
  }

  if (command === 'upsw') {
    let message = `MAU YANG MANA?
.upswimage < caption/no caption > ( untuk foto )
.upswvideo < caption/no caption > ( untuk video )
.upswaudio ( untuk audio )
.upswtext < caption > ( untuk text )`;
    m.reply(message);
  }
};

handler.help = ['upswimage', 'upswvideo', 'upswtext', 'upswaudio', 'upsw'];
handler.tags = ['owner'];
handler.command = /^(upswimage|upswvideo|upswtext|upswaudio|upsw)$/i;
handler.owner = true;

export default handler;
