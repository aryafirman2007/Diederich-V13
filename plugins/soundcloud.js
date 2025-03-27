/*
- Fitur: Search & Downloader Audio SoundCloud
- Info: Memungkinkan untuk mencari dan mengunduh audio dari SoundCloud menggunakan integrasi layanan RestApi
- Type: Plugins `ESM` & `CJS`
- By: SkyWalker
_Dont Delete This © Credits_
- _Big Thanks For Penyedia Api_
- [ `Sumber` ]
- https://whatsapp.com/channel/0029Vb1NWzkCRs1ifTWBb13u
*/

// Import untuk ESM
import axios from 'axios'
import * as cheerio from 'cheerio'

// Import untuk CJS
// const axios = require('axios')
// const cheerio = require('cheerio')

let handler = async (m, { conn, args }) => {
    if (!args[0]) return conn.reply(m.chat, "Gunakan format: .soundcloud <judul lagu>", m)

    conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } })

    try {
        let results = await SoundCloudSearch(args.join(" "))
        if (!results.length) return conn.reply(m.chat, "Tidak ada hasil ditemukan.", m)

        let track = results[0]
        let downloadData = await SoundCloudDownload(track.link)

        if (!downloadData) return conn.reply(m.chat, "Gagal mendapatkan link download.", m)

        let message = `🎵 *Judul:* ${downloadData.title}\n🔗 *Link:* ${track.link}\n\n> Sedang mendownload audio...`

        await conn.sendMessage(m.chat, {
            image: { url: downloadData.thumbnail },
            caption: message
        }, { quoted: m })

        await conn.sendMessage(m.chat, {
            audio: { url: downloadData.downloadUrl },
            mimetype: "audio/mp4"
        }, { quoted: m })

    } catch (error) {
        console.error("Error SoundCloud:", error)
        conn.reply(m.chat, "Terjadi kesalahan, coba lagi nanti.", m)
    }
}

handler.help = ["soundcloud"]
handler.tags = ["music"]
handler.command = /^(soundcloud|scsearch)$/i

// Export untuk ESM
export default handler

// Export untuk CJS
// module.exports = handler

async function SoundCloudSearch(query) {
    try {
        const { data } = await axios.get(`https://soundcloud.com/search?q=${encodeURIComponent(query)}`)
        const $ = cheerio.load(data)
        const noscriptContent = []

        $('#app > noscript').each((_, el) => noscriptContent.push($(el).html()))

        if (noscriptContent.length < 2) throw new Error("Data tidak ditemukan")

        const _$ = cheerio.load(noscriptContent[1])
        const results = []

        _$('ul > li > h2 > a').each((_, el) => {
            const link = $(el).attr('href')
            const title = $(el).text()

            if (link && link.split('/').length === 3) {
                results.push({
                    title: title || "Tidak ada judul",
                    link: `https://soundcloud.com${link}`
                })
            }
        })

        return results.length ? results : []
    } catch {
        return []
    }
}

async function SoundCloudDownload(url) {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/d/soundcloud?url=${encodeURIComponent(url)}`)
        if (!data?.data?.url) throw new Error("Gagal mendapatkan link download.")

        return {
            title: data.data.title || "Tanpa Judul",
            thumbnail: data.data.thumbnail || "",
            downloadUrl: data.data.url
        }
    } catch {
        return null
    }
}