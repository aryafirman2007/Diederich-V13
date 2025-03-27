/*
- Fitur: Berita Bola Dari website vivagoal 
- Info: Mendapatkan Informasi Jadwal bola dll
- Type: Plugins `ESM`& `CJS`
- By: SkyWalker
- [ `SUMBER` ]
- https://whatsapp.com/channel/0029Vb1NWzkCRs1ifTWBb13u
- [ `SUMBER` `SCRAPE` ]
- https://whatsapp.com/channel/0029Vb2mOzL1Hsq0lIEHoR0N/270
*/
import axios from 'axios'
import cheerio from 'cheerio'
import https from 'https'
// CJS

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

let handler = async (m, { conn }) => {
  let articles = await fetchBeritaBola()
  if (!articles.length) return m.reply("Gagal mengambil berita bola.")

  let timestamp = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })

  let caption = `📢 Berita Bola Terbaru (Diperbarui: ${timestamp})\n\n`

  articles.slice(0, 5).forEach((article, i) => {
    caption += `${i + 1}. ${article.title}\n`
    caption += `📅 Tanggal: ${article.date}\n`
    caption += `🏷️ Kategori: ${article.categories.join(", ") || "Tidak diketahui"}\n`
    caption += `🔗 Baca Selengkapnya: ${article.url}\n\n`
  })

  await conn.sendMessage(m.chat, {
    image: { url: articles[0].image },
    caption
  }, { quoted: m })
}

handler.command = /^beritabola$/i
handler.tags = ["news"]
handler.help = ["beritabola"]

export default handler
//CJS 


async function fetchBeritaBola() {
  try {
    const { data: html } = await axios.get("https://vivagoal.com/category/berita-bola/", {
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    })
    const $ = cheerio.load(html)
    const articles = []

    $(".swiper-wrapper .swiper-slide, .col-lg-6.mb-4, .col-lg-4.mb-4").each((i, el) => {  
      const url = $(el).find("a").attr("href") || null  
      const image = $(el).find("figure img").attr("src") || null  
      const title = $(el).find("h3 a").text().trim() || null  
      const categories = $(el)  
        .find("a.vg_pill_cat")  
        .map((i, cat) => $(cat).text().trim())  
        .get()  
      let date = $(el).find("time").attr("datetime") || $(el).find(".posted-on").text().trim()  
      if (!date) date = new Date().toISOString().split("T")[0]  

      if (url && title && image) {  
        articles.push({ url, image, title, categories, date })  
      }  
    })  

    return articles
  } catch (error) {
    return []
  }
}