/*
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `Contoh penggunaan: ${usedPrefix + command} Crot Crot`;
	let url = `https://ochinpo-helper.hf.space/brat?text=${text}`
	conn.sendFile(m.chat, url, null, `${text}`, m)
}
handler.help = ['brat']
handler.tags = ['image']
handler.command = /^(brat)$/i
export default handler
*/
/*
PLUGIN BRAT ( KETIKAN LATAR BELAKANG PUTIH😹 )
PLUGIN INI PENDEK GAK USAH PANJANG-PANJANG😹
BTW INI IMAGE YA BUKAN STICKER😹
PLUGIN PENDEK INI DIBUAT OLEH RAPIKZ😹
LINK CHNYA:
https://chat.whatsapp.com/LnEShOfN7fF6xL62EAUuG9
*/
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `Contoh penggunaan: ${usedPrefix + command} Crot Crot`;
let stiker = await sticker(null, `https://ochinpo-helper.hf.space/brat?text=${text}`, '', '')
conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)  
} 

handler.help = ['brat']
handler.tags = ['image']
handler.command = /^(brat)$/i
export default handler