import fetch from "node-fetch";
const { proto, generateWAMessageFromContent, prepareWAMessageMedia } = (
  await import("@adiwajshing/baileys")
)["default"];
import fs from "fs";
import path from "path";

let handler = async (m, { conn }) => {
  const videoFolder = "./video"; // Folder tempat menyimpan video
  const files = fs.readdirSync(videoFolder).filter(file => file.endsWith(".mp4"));

  if (!files.length) {
    return conn.reply(m.chat, "Tidak ada file video yang ditemukan di folder.", m);
  }

  const randomFile = files[Math.floor(Math.random() * files.length)];
  const filePath = path.join(videoFolder, randomFile);

  // Upload video ke server WhatsApp
  const media = await prepareWAMessageMedia(
    { video: fs.readFileSync(filePath) },
    { upload: conn.waUploadToServer }
  );

  // Membuat pesan video
  const messageContent = proto.Message.fromObject({
    videoMessage: media.videoMessage,
  });

  const message = generateWAMessageFromContent(
    m.chat,
    messageContent,
    { quoted: m }
  );

  // Kirim pesan ke chat
  await conn.relayMessage(m.chat, message.message, {});
};

handler.help = ["bokep"];
handler.tags = ["NSFW"];
handler.command = /^(bokep)$/i;
handler.limit = 10;

export default handler;
