/*
- Fitur: MediaFire Downloader
- Info: Mengunduh file dari link MediaFire.
- Type: Plugins `ESM` & `CJS`
- Recode By: SkyWalker
- [ `Sumber` ]
- https://whatsapp.com/channel/0029Vb1NWzkCRs1ifTWBb13u
- [ `Sumber Utama` ]
- https://whatsapp.com/channel/0029VakRR89L7UVPwf53TB0v
*/

// Import untuk ESM
import fetch from 'node-fetch'
import cheerio from 'cheerio'

// Import untuk CJS
// const fetch = require('node-fetch')
// const cheerio = require('cheerio')

let handler = async (m, { conn, text }) => {
    conn.mediafire = conn.mediafire || {}

    if (m.sender in conn.mediafire) throw "❗ Masih ada proses yang belum selesai. Silakan tunggu."

    if (!text) throw "❗ Masukkan link MediaFire yang ingin diunduh."

    conn.mediafire[m.sender] = true
    await conn.sendMessage(m.chat, { react: { text: "🌀", key: m.key } })

    try {
        let result = await mediafireDownloader(text)

        if (!result.url) throw "❌ Gagal mendapatkan link unduhan."

        let caption = `✅ *Berhasil mengunduh file dari MediaFire!*\n\n`
            + `📂 *Nama File:* ${result.filename}\n`
            + `📦 *Ukuran:* ${result.size}\n`
            + `📅 *Tanggal Unggah:* ${result.date}\n`
            + `⏰ *Waktu Unggah:* ${result.time}\n`
            + `🌍 *Diupload dari:* ${result.from}\n\n`
            + `🔗 *Link:* ${result.url}`

        await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } })
        await conn.sendMessage(m.chat, {
            document: { url: result.url },
            mimetype: 'application/octet-stream',
            fileName: result.filename,
            caption: caption
        }, { quoted: m })
    } catch (error) {
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
        m.reply(`❌ *Gagal mengunduh file:* ${error.message}`)
    }

    delete conn.mediafire[m.sender]
}

handler.help = ["mediafire"]
handler.tags = ["downloader"]
handler.command = /^(mediafire|mf)$/i

export default handler

// Function Async di Bawah
async function mediafireDownloader(url) {
    const response = await fetch('https://r.jina.ai/' + url, {
        headers: { 'x-return-format': 'html' }
    })
    if (!response.ok) throw new Error("Gagal mengambil data dari MediaFire!")

    const textHtml = await response.text()
    const $ = cheerio.load(textHtml)
    const TimeMatch = $('div.DLExtraInfo-uploadLocation div.DLExtraInfo-sectionDetails')
        .text()
        .match(/This file was uploaded from (.*?) on (.*?) at (.*?)\n/)

    const fileSize = $('a#downloadButton').text().trim().split('\n')[0].trim()
    return {
        title: $('div.dl-btn-label').text().trim() || "Tidak diketahui",
        filename: $('div.dl-btn-label').attr('title') || "file",
        url: $('a#downloadButton').attr('href'),
        size: fileSize || "Tidak diketahui",
        from: TimeMatch?.[1] || "Tidak diketahui",
        date: TimeMatch?.[2] || "Tidak diketahui",
        time: TimeMatch?.[3] || "Tidak diketahui"
    }
}