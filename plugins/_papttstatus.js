import fetch from "node-fetch";
const { proto, generateWAMessageFromContent, prepareWAMessageMedia } = (
  await import("@adiwajshing/baileys")
)["default"];
import "@bochilteam/scraper";
import fs from "fs";
import path from "path";

let handler = async (m, { conn }) => {
  const furryFolder = "./furry";
  const files = fs.readdirSync(furryFolder);

  if (files.length === 0) {
    return conn.reply(m.chat, "Folder 'furry' kosong. Pastikan ada file media di dalamnya.", m);
  }

  for (let i = 0; i < 10; i++) {
    const randomFile = files[Math.floor(Math.random() * files.length)];
    let url;

    if (randomFile) {
      url = path.join(furryFolder, randomFile);
    } else {
      // Fallback in case no file is found
      url = furry[Math.floor(Math.random() * furry.length)];
    }

    if (!url.startsWith("http")) {
      // Convert local path to URL
      url = `${path.resolve(url)}`;
    }

    let mediaType = url.endsWith(".mp4") ? "video" : "image";
    let media = await prepareWAMessageMedia(
      { [mediaType]: { url: url } },
      { upload: conn.waUploadToServer }
    );

    let message = generateWAMessageFromContent(
      m.chat,
      proto.Message.fromObject({
        viewOnceMessage: {
          message: {
            [`${mediaType}Message`]: {
              ...media[`${mediaType}Message`],
            },
          },
        },
      }),
      { quoted: m }
    );

    await conn.relayMessage(m.chat, message.message, {});
  }
};

handler.help = ["asupan"];
handler.tags = ["nsfw"];
handler.command = /^(asupan)$/i;
export default handler;
