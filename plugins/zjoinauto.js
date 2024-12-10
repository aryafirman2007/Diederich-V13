import fetch from "node-fetch";

// Regex untuk mendeteksi link grup WhatsApp
let linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn }) => {
    // Log pesan yang diterima untuk debug
    console.log("Received message:", m.text);

    // Cek apakah ada link grup WhatsApp di dalam pesan
    let linkMatch = m.text.match(linkRegex);
    if (linkMatch) {
        console.log("WhatsApp group link detected:", linkMatch[0]);
        let code = linkMatch[1];
        try {
            // Bot mencoba untuk join ke grup menggunakan kode dari link
            let res = await conn.groupAcceptInvite(code);
            console.log(`Bot successfully joined group ${res.gid}`);
        } catch (e) {
            console.log("Failed to join the group:", e);
        }
    } else {
        console.log("No WhatsApp group link found in the message.");
    }
};

handler.customPrefix = linkRegex; // Trigger handler jika ada link grup WhatsApp
handler.command = new RegExp(); // Semua pesan akan diproses

export default handler;
