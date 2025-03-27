import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";

  if (!mime) return m.reply(`Kirim/reply gambar dengan caption *${usedPrefix + command}* prompt`);
  if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`Format ${mime} tidak didukung! Hanya jpeg/jpg/png`);
  if (!text) return m.reply(`Masukkan prompt yang jelas!\n\nContoh: *${usedPrefix + command}* ubah latar belakang menjadi pantai`);

  let promptText = text;

  m.reply("Wait...");

  try {
    let imgData = await q.download();
    let genAI = new GoogleGenerativeAI("AIzaSyDvKmTLHV59HlPcj_c-Ff3i0DpPTWeUS2k");

    const base64Image = imgData.toString("base64");

    const contents = [
      { text: promptText },
      {
        inlineData: {
          mimeType: mime,
          data: base64Image,
        },
      },
    ];

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp-image-generation",
      generationConfig: {
        responseModalities: ["Text", "Image"],
      },
    });

    const response = await model.generateContent(contents);

    let resultImage;
    let resultText = "";

    for (const part of response.response.candidates[0].content.parts) {
      if (part.text) {
        resultText += part.text;
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        resultImage = Buffer.from(imageData, "base64");
      }
    }

    if (resultImage) {
      const tempPath = path.join(process.cwd(), "tmp", `gemini_${Date.now()}.png`);
      fs.writeFileSync(tempPath, resultImage);

      await conn.sendMessage(m.chat, {
        image: { url: tempPath },
      }, { quoted: m });

      setTimeout(() => {
        try {
          fs.unlinkSync(tempPath);
        } catch (err) {
          console.error("Failed to delete temporary file:", err);
        }
      }, 30000);
    } else {
      m.reply("Gagal menghasilkan gambar.");
    }
  } catch (error) {
    console.error("Error:", error);
    m.reply(`Error: ${error.message}`);
  }
};

handler.help = ["draw"];
handler.tags = ["ai"];
handler.command = ["draw"];

export default handler;