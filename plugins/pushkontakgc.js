let handler = async (m, { conn, text }) => {
    const delay = (time) => new Promise((res) => setTimeout(res, time));
    const [idgc, pesan] = text.split('|');

    if (!idgc || !pesan) {
        throw 'Contoh: pushkontakv2 idgc|pesan';
    }

    // Mendapatkan data grup
    let metadata = await conn.groupMetadata(idgc);
    let participants = metadata.participants.filter((p) => p.id.endsWith('.net')).map((p) => p.id);

    if (!participants.length) {
        throw `Grup dengan ID ${idgc} tidak memiliki anggota.`;
    }

    let totalMembers = participants.length;
    m.reply(`*Push Kontak Sedang Dijalankan*\n\nJumlah: ${totalMembers} Member\nPerkiraan Selesai Dalam: ${totalMembers * 2} detik\n\nHarap Jangan Spam Push Kontak!`);

    let completed = 0;

    for (let participant of participants) {
        await delay(2000); // Menunggu 2 detik sebelum mengirim ke peserta berikutnya
        try {
            await conn.sendMessage(participant, { text: pesan });
            completed++;
        } catch (err) {
            console.error(`Gagal mengirim ke ${participant}:`, err);
        }
    }

    m.reply(`*Push Kontak Selesai*\n\nJumlah: ${totalMembers} Member\nBerhasil Terkirim: ${completed}\nGagal: ${totalMembers - completed}`);
};

handler.help = ['pushkontakv2 <idgc|pesan>'];
handler.tags = ['owner'];
handler.command = /^(pushkontakv2)$/i;
handler.owner = true;

export default handler;
