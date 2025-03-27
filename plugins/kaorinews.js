/*
- Fitur: Berita Anime Terbaru Dari kaorinusantara.or.id
- Info: Mendapatkan Informasi Tentang Anime & Dan Lain Lain
- Type: Plugins `ESM`& `CJS`
- By: SkyWalker
- [ `SUMBER` ]
- https://whatsapp.com/channel/0029Vb1NWzkCRs1ifTWBb13u
- [ `SCRAPE BY` ]
- REZA - THANKS SCRAPE NYA KUNYUK😚
*/
import axios from 'axios'
import cheerio from 'cheerio'

/* CJS
const axios = require('axios')
const cheerio = require('cheerio')
*/

let handler = async (m, { conn, text }) => {
  let isSearch = text.length > 0
  let articles = isSearch ? await searchKaoriNews(text) : await fetchKaoriNews()

  if (!articles.length) return conn.sendMessage(m.chat, { text: "Gagal mengambil berita dari Kaori Nusantara Coba Lagi Nanti" }, { quoted: m })

  let timestamp = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
  let caption = `📰 *${isSearch ? `Hasil Pencarian "${text}"` : "Berita Anime & Pop Culture Terbaru"}*\n\n📅 *Update:* ${timestamp}\n\n`

  for (let i = 0; i < Math.min(articles.length, 5); i++) {
    let article = articles[i]

    caption += `🎯 *Judul:* ${article.title}\n`
    if (article.altTitle) caption += `🔖 *Judul Alternatif:* ${article.altTitle}\n`
    caption += `📆 *Tanggal:* ${article.date || "Tidak tersedia"}\n`
    caption += `✍️ *Penulis:* ${article.author || "Tidak diketahui"}\n`
    caption += `📂 *Kategori:* ${article.category || "Tidak tersedia"}\n\n`
    caption += `📝 *Deskripsi:* ${article.excerpt}\n\n`
    caption += `📖 *Isi Berita:* \n${article.content}\n\n`
    caption += `*Baca Selengkapnya:* ${article.url}\n\n`
  }

  await conn.sendMessage(m.chat, {
    image: { url: articles[0].image },
    caption
  }, { quoted: m })
}

handler.command = /^kaorinews$/i
handler.tags = ["news"]
handler.help = ["kaorinews"]

export default handler

/* CJS
module.exports = handler
*/

async function fetchKaoriNews() {
  try {
    const { data: html } = await axios.get("https://www.kaorinusantara.or.id/newsline")
    const $ = cheerio.load(html)
    const articles = []

    $(".td_module_10").each((_, el) => {
      const title = $(el).find(".entry-title a").text().trim()
      const url = $(el).find(".entry-title a").attr("href")
      const excerpt = $(el).find(".td-excerpt").text().trim()
      const date = $(el).find(".td-post-date time").text().trim()
      const author = $(el).find(".td-post-author-name a").text().trim()
      const category = $(el).find(".td-post-category").text().trim()
      const image = $(el).find(".td-module-thumb img").attr("data-src") || $(el).find(".td-module-thumb img").attr("src")

      articles.push({ title, url, date, author, category, excerpt, image })
    })

    return await scrapeArticleDetails(articles)
  } catch (error) {
    return []
  }
}

async function searchKaoriNews(query) {
  try {
    const { data: html } = await axios.get(`https://www.kaorinusantara.or.id/?s=${query}`)
    const $ = cheerio.load(html)
    const results = []

    $(".td_module_10").each((_, el) => {
      const title = $(el).find(".entry-title a").text().trim()
      const url = $(el).find(".entry-title a").attr("href")
      const excerpt = $(el).find(".td-excerpt").text().trim()
      const date = $(el).find(".td-post-date time").text().trim()
      const author = $(el).find(".td-post-author-name a").text().trim()
      const category = $(el).find(".td-post-category").text().trim()
      const image = $(el).find(".td-module-thumb img").attr("data-src") || $(el).find(".td-module-thumb img").attr("src")

      results.push({ title, url, date, author, category, excerpt, image })
    })

    return await scrapeArticleDetails(results)
  } catch (error) {
    return []
  }
}

async function scrapeArticleDetails(articles) {
  return await Promise.all(
    articles.map(async (article) => {
      try {
        const { data: html } = await axios.get(article.url)
        const $ = cheerio.load(html)

        const altTitle = $('meta[property="og:title"]').attr("content") || ""
        const content = $(".td-post-content").find("p").text().trim() || "Tidak tersedia"

        return { ...article, altTitle, content }
      } catch (error) {
        return article
      }
    })
  )
}