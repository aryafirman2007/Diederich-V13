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
              text: "Furry NSFW",
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
                    buttonParamsJson: '{"display_text":"Next","id":".nsfw"}',
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

handler.help = ["nsfw"];
handler.tags = ["nsfw"];
handler.command = /^(nsfw)$/i;
export default handler;

global.furry = [
  "https://telegra.ph/file/a1f2afe16b515fc22dbe2.jpg", //bisa video dan gambar
  "https://telegra.ph/file/13cc106645c862a109465.jpg",
  "https://telegra.ph/file/5a065c3e3f5cf56c831b3.jpg",
  "https://telegra.ph/file/2e769bef7c3bf5343e56b.jpg",
  "https://telegra.ph/file/4237bf0d4b068d7484cc6.jpg",
  "https://telegra.ph/file/b2750bb05888c71192f6d.jpg",
  "https://telegra.ph/file/e6f61ed508341b27b82af.jpg",
  "https://telegra.ph/file/3adcb1e18a83b912c3e20.jpg",
  "https://telegra.ph/file/af8bfe9172ccca1f1eb5c.jpg",
  "https://telegra.ph/file/6a01d022eaf17c8264b44.jpg",
  "https://telegra.ph/file/afde4653ef8352c456b8e.jpg",
  "https://telegra.ph/file/cc8579a77568f361c3f02.jpg",
  "https://telegra.ph/file/2dcfc4181828367acf62b.jpg",
  "https://telegra.ph/file/010e2966da76346c1eb56.jpg",
  "https://telegra.ph/file/49c4b31cf42ef29da5013.jpg",
  "https://telegra.ph/file/63365f1611f2c7853c970.jpg",
  "https://telegra.ph/file/a9b144c16858f68a136f0.jpg",
  "https://telegra.ph/file/3b61e142038aecfcaf453.jpg",
  "https://telegra.ph/file/ba64e35c0a789f148101e.jpg",
  "https://telegra.ph/file/7baf7b6412107dd57a977.jpg",
  "https://telegra.ph/file/0ee9c2fbb4132cc91f42f.jpg",
  "https://telegra.ph/file/fc0432c095899acd5b589.jpg",
  "https://telegra.ph/file/57cb9d5a9eed10ff5585a.jpg",
  "https://telegra.ph/file/d2ee48c26cf5c485ad962.jpg",
  "https://telegra.ph/file/80769785068b4dd47da2a.jpg",
  "https://telegra.ph/file/cd8954cdaa11fc5ac9fee.jpg",
  "https://telegra.ph/file/dd664bfb0b26943226720.jpg",
  "https://telegra.ph/file/c09d6d5fe16aaae5a563f.jpg",
  "https://telegra.ph/file/f35bc71a5357933388dcc.jpg",
  "https://telegra.ph/file/caea81e2f31a4ad6f713a.jpg",
  "https://telegra.ph/file/f3fea988372b6f732b7f5.jpg",
  "https://telegra.ph/file/ae5da2e6d4c2b6137fc16.jpg",
  "https://telegra.ph/file/7bfcd01603a52001b14ed.jpg",
  "https://telegra.ph/file/12bc292a718279412427d.jpg",
  "https://telegra.ph/file/1741716707ca283ef9315.jpg",
  "https://telegra.ph/file/ffe2d8e55b349de48fd40.jpg",
  "https://telegra.ph/file/dc2ac83265b9fe9e01c10.jpg",
  "https://telegra.ph/file/8010436f95e969e0e4f5f.jpg",
  "https://telegra.ph/file/181b4fb335efbce1d57a7.jpg",
  "https://telegra.ph/file/a5cbfa6b88da3595edc2b.jpg",
  "https://telegra.ph/file/35d12adec1554586fb81e.jpg",
  "https://telegra.ph/file/f8e04ac4c9868d95d1083.jpg",
  "https://telegra.ph/file/e7b4cc5ce8b383e072832.jpg",
  "https://telegra.ph/file/275e01383fae6b634e385.jpg",
  "https://telegra.ph/file/e04750ce36e8cc9f56ce4.jpg",
  "https://telegra.ph/file/022e8e27f99110f10d1bd.jpg",
  "https://telegra.ph/file/c803167d4c5a2917debc6.jpg",
  "https://telegra.ph/file/bcb32d0172f3f9da96c73.jpg",
  "https://telegra.ph/file/f28d01b689e8114f07537.jpg",
  "https://telegra.ph/file/dbe484dd060bb5235d63c.jpg",
  "https://telegra.ph/file/629c9d431b0a2b8506bc3.jpg",
  "https://telegra.ph/file/ee4fa379276523540e79c.jpg",
  "https://telegra.ph/file/7f0cc9134115662fa0b70.jpg",
  "https://telegra.ph/file/73155139fd4a1713d06e5.jpg",
  "https://telegra.ph/file/4668e792e9ba9e4f9539a.jpg",
  "https://telegra.ph/file/baba5789db78cdfbd3948.jpg",
  "https://telegra.ph/file/e9aa1c1927a34abc6e150.jpg",
  "https://telegra.ph/file/a96f859090c65ee9206a4.jpg",
  "https://telegra.ph/file/fbb1f1db5fc8be1428ea9.jpg",
];
