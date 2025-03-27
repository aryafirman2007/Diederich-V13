import { GoogleGenerativeAI } from "@google/generative-ai";
import FormData from 'form-data';
import { fileTypeFromBuffer } from 'file-type';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw (`Contoh:\n${usedPrefix}${command} Halo?`);
    
    const apikeynyah = "AIzaSyDvKmTLHV59HlPcj_c-Ff3i0DpPTWeUS2k";
    const genAI = new GoogleGenerativeAI(apikeynyah);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = text;
    const result = await model.generateContent(prompt);
    
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    
    if (!mime) {
        return m.reply(`[ GEMINI - AI ]\n\n${await result.response.text()}`);
    }
    
    if (!/image\/(jpe?g|png|webp)/.test(mime)) {
        return m.reply(`Tipe ${mime} tidak didukung!`);
    }
    
    let media = await q.download();
    let link = await upload(media);
    
    const imageResp = await fetch(link)
        .then((response) => response.arrayBuffer());
    
    const result2 = await model.generateContent([
        {
            inlineData: {
                data: Buffer.from(imageResp).toString("base64"),
                mimeType: "image/jpeg",
            },
        },
        text,
    ]);
    
    let yayaya = `[ GEMINI - AI ]\n\n${await result2.response.text()}`;
    m.reply(yayaya);
};

handler.help = ['gemini'];
handler.tags = ['ai'];
handler.command = /^(gemini|bard)$/i;
handler.limit = true;

export default handler;

async function upload(buffer) {
    let { ext } = await fileTypeFromBuffer(buffer);
    let bodyForm = new FormData();
    bodyForm.append("fileToUpload", buffer, "file." + ext);
    bodyForm.append("reqtype", "fileupload");
    
    let res = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: bodyForm,
    });
    
    let data = await res.text();
    return data;
}
