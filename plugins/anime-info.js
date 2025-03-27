/*
- Fitur: Anime-Information
- Info: ya mencari informasi suatu anime, latar belakang dan lain lain
- Requirement: npm i @iamtraction/google-translate
- Type: Plugins `ESM`
- By: SkyWalker
_Dont Delete This © Credits_
- [ `Sumber` ]
- https://whatsapp.com/channel/0029Vb1NWzkCRs1ifTWBb13u
*/

import fetch from 'node-fetch'
import translate from '@iamtraction/google-translate'

let handler = async (m, { conn, text }) => {
  if (!text) throw `*_Masukkan Judul Anime Yang Ingin Kamu Cari !_*`

  conn.reply(m.chat, `🔍 Sedang mencari informasi anime *${text}*... Mohon tunggu sebentar ya!`, m)

  let res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(text)}&limit=1`)
  if (!res.ok) throw 'Anime tidak ditemukan, coba dengan judul lain!'

  let json = await res.json()
  if (!json.data || json.data.length === 0) throw 'Anime tidak ditemukan! Coba periksa kembali judulnya.'

  let anime = json.data[0]

  let { mal_id, title, title_japanese, title_english, trailer, episodes, type, status, duration, rating, score, scored_by, rank, popularity, members, favorites, synopsis, background, year, season, images, genres, studios, producers, url } = anime

  let translatedSynopsis = await translate(synopsis || 'Sinopsis tidak tersedia.', { to: 'id' })
    .then(res => res.text)
    .catch(() => 'Tidak dapat menerjemahkan sinopsis, menampilkan sinopsis asli.')

  let translatedBackground = await translate(background || 'Tidak tersedia.', { to: 'id' })
    .then(res => res.text)
    .catch(() => 'Tidak dapat menerjemahkan latar belakang, menampilkan versi asli.')

  let genreList = genres?.map(g => g.name).join(', ') || 'Tidak tersedia'
  let producerList = producers?.map(p => p.name).join(', ') || 'Tidak tersedia'
  let studioList = studios?.map(s => s.name).join(', ') || 'Tidak tersedia'

  let animeInfo = `*INFO ANIME*

📺 *Judul*:  
- *Romaji:* ${title || 'Tidak tersedia'}  
- *Japanese:* ${title_japanese || 'Tidak tersedia'}  
- *English:* ${title_english || 'Tidak tersedia'}  

🎬 *Jumlah Episode*: ${episodes || 'Tidak tersedia'}  
✉️ *Jenis*: ${type || 'Tidak tersedia'}  
🗂 *Status*: ${status || 'Tidak tersedia'}  
⌛ *Durasi*: ${duration || 'Tidak tersedia'}  
🌟 *Favorit*: ${favorites || 'Tidak tersedia'}  
🧮 *Skor*: ${score || 'Tidak tersedia'}  
😍 *Rating*: ${rating || 'Tidak tersedia'}  
😎 *Diberi Skor oleh*: ${scored_by || 'Tidak tersedia'}  
💥 *Popularitas*: ${popularity || 'Tidak tersedia'}  
⭐ *Peringkat*: ${rank || 'Tidak tersedia'}  
✨ *Musim*: ${season || 'Tidak tersedia'}  
🏁 *Tahun Rilis*: ${year || 'Tidak tersedia'}  
🤗 *Produser*: ${producerList}  
🤠 *Studio*: ${studioList}  
👥 *Jumlah Anggota*: ${members || 'Tidak tersedia'}  
⛓️ *Link Anime*: ${url || 'Tidak tersedia'}  

📝 *Latar Belakang*: ${translatedBackground}  
💬 *Sinopsis*: ${translatedSynopsis}`

  let imageUrl = images?.jpg?.large_image_url || images?.jpg?.image_url || ''
  let trailerUrl = trailer?.url || 'Tidak tersedia'

  conn.sendFile(m.chat, imageUrl, 'anime.jpg', `${animeInfo}\n📺 *Trailer*: ${trailerUrl}`, m)
}

handler.help = ['animeinfo']
handler.tags = ['anime']
handler.command = /^(animeinfo)$/i

export default handler