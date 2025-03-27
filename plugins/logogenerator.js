/*
Jangan Hapus Wm Bang 

*Logo Generator  Plugins Esm*

Aku Lapar😭

*[Sumber]*
https://whatsapp.com/channel/0029Vb3u2awADTOCXVsvia28

*[Sumber Scrape]*

https://whatsapp.com/channel/0029VbB0oUvBlHpYbmFDsb3E
*/

import axios from "axios";

const handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("Masukkan judul, ide, dan slogan logo. Format: .logogen Judul|Ide|Slogan");
  }

  const [title, idea, slogan] = text.split("|");

  if (!title || !idea || !slogan) {
    return m.reply("Format salah. Gunakan : .logogen Judul|Ide|Slogan\n\n*Example :* .logogen ArFur|Furry|Jangan lupa Follow yah");
  }

  try {
    const payload = {
      ai_icon: [333276, 333279],
      height: 300,
      idea: idea,
      industry_index: "N",
      industry_index_id: "",
      pagesize: 4,
      session_id: "",
      slogan: slogan,
      title: title,
      whiteEdge: 80,
      width: 400
    };

    const { data } = await axios.post("https://www.sologo.ai/v1/api/logo/logo_generate", payload);
    
    if (!data.data.logoList || data.data.logoList.length === 0) {
      return m.reply("Gagal Membuat Logo");
    }

    const logoUrls = data.data.logoList.map(logo => logo.logo_thumb);
    
    for (const url of logoUrls) {
      await conn.sendMessage(m.chat, { image: { url: url } });
    }
  } catch (error) {
    console.error("Error generating logo:", error);
    await m.reply("Failed to Create Logo");
  }
};

handler.help = ['logogen'];
handler.command = ['logogen'];
handler.tags = ['tools'];

export default handler;