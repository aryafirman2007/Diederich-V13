import fetch from "node-fetch";
const { proto, generateWAMessageFromContent, prepareWAMessageMedia } = (
  await import("@adiwajshing/baileys")
)["default"];
import "@bochilteam/scraper";
import fs from "fs";
import path from "path";

let handler = async (m, { conn }) => {
  const furryFolder = "./video";
  const files = fs.readdirSync(furryFolder);
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
    { upload: conn.waUploadToServer },
  );

  let message = generateWAMessageFromContent(
    m.chat,
    proto.Message.fromObject({
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: "Nih bancol",
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: "Furry NSFW Video",
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false,
              ...media,
            }),
            nativeFlowMessage:
              proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: [
                  {
                    name: "quick_reply",
                    buttonParamsJson: '{"display_text":"Next","id":".bokep"}',
                  },
                ],
              }),
          }),
        },
      },
    }),
    { quoted: m },
  );

  await conn.relayMessage(m.chat, message.message, {});
};

handler.help = ["bokep"];
handler.tags = ["nsfw"];
handler.command = /^(bokep)$/i;
handler.limit = 10 
export default handler;
