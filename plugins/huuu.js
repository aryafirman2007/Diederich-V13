import fetch from "node-fetch";
import { sticker } from "../lib/sticker.js";
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who =
        m.mentionedJid && m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.fromMe
              ? conn.user.jid
              : m.sender;
    //let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
    //let name = await conn.getName(who)

    let stiker = await sticker(
        null,
        global.API(`${pickRandom(stikerhuuu)}`),
        global.packname,
        global.author,
    );
    if (stiker)
        return await conn.sendFile(m.chat, stiker, "sticker.webp", "", m);
};

handler.customPrefix =
    /^(ok|oke|iya|hum?u|bile?k|ban?h|cum?|knt?l|y?|mmk|p|b(a|i)?c?(o|i)?(t|d)?|wibu|p(a)?nt(e)?k|pepe?k|owner|fur?y|fur|cubit?|halo|hlo|pagi|pgi|siang|sore|malam|mlam|selamat|slamat|hm|hmm|hmmm)$/i;
handler.command = new RegExp();

export default handler;

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())];
}
let stikerhuuu = [
    "https://telegra.ph/file/4f3af191c35dd8d1e010b.jpg",
    "https://telegra.ph/file/67afb9aae5e50939307db.jpg",
    "https://telegra.ph/file/952e07fe72a8b55a390cd.jpg",
    "https://telegra.ph/file/72cba46babbffef6c65e9.jpg",
    "https://telegra.ph/file/604ddd4b2cf9e6e637d32.jpg",
    "https://telegra.ph/file/a87b23886f017245358ac.jpg",
    "https://telegra.ph/file/e4f87e363e1badc7e5219.jpg",
    "https://telegra.ph/file/3c70a7f40785d722478fe.jpg",
    "https://telegra.ph/file/4857eb8854fd1987619be.jpg",
    "https://telegra.ph/file/ce721a067e9ed8303841b.jpg",
    "https://telegra.ph/file/2023a4f37bd694139f7d9.jpg",
    "https://telegra.ph/file/fb76a5162f68ee09875a1.jpg",
    "https://telegra.ph/file/982e3015fc38b58f0a04d.jpg",
    "https://telegra.ph/file/d5770dc943b64ed46d1ce.jpg",
    "https://telegra.ph/file/dcf3ed31570fd351bbcd8.jpg",
    "https://telegra.ph/file/3048b6f549d78d76cbce0.jpg",
    "https://telegra.ph/file/a2047452e3409c105fe92.jpg",
    "https://telegra.ph/file/28f3ba48bd033dcc92197.jpg",
    "https://telegra.ph/file/6ed5d6abd513814b6d2aa.jpg",
    "https://telegra.ph/file/a2205a585398d81b9af22.jpg",
    "https://telegra.ph/file/448a2a2dd992f2ec427bf.jpg",
    "https://telegra.ph/file/86d18b7e4dce773afb199.jpg",
    "https://telegra.ph/file/4776f388fad36d24cae1c.jpg",
    "https://telegra.ph/file/ec6b35d004923e2b21a7f.jpg",
    "https://telegra.ph/file/d2a78afe3f94761831bbf.jpg",
    "https://telegra.ph/file/0b319f74fe1fa6489c77e.jpg",
    "https://telegra.ph/file/e351a6d28b43b280ccc24.jpg",
    "https://telegra.ph/file/8a8b79da486b8d5c05ae9.jpg",
    "https://telegra.ph/file/28e2ff9cf1cc81f6902e6.jpg",
    "https://telegra.ph/file/cec14b8caf6637e800b51.jpg",
    "https://telegra.ph/file/5180097be55ea578fbde5.jpg",
    "https://telegra.ph/file/e6eb8efbc4b7881b816a7.jpg",
    "https://telegra.ph/file/a59103cc90d9d8663077c.jpg",
    "https://telegra.ph/file/b5aeb31175aadba970056.jpg",
    "https://telegra.ph/file/dea14018195162dba801c.jpg",
    "https://telegra.ph/file/a75efb3f782d1b794550a.jpg",
    "https://telegra.ph/file/2b8dbc7dacc6d258e826d.jpg",
    "https://telegra.ph/file/36c0fae9d460425f2f880.jpg",
    "https://telegra.ph/file/b2f5ca6ccc1f55874f649.jpg",
    "https://telegra.ph/file/18620e34f5c7744e61276.jpg",
    "https://telegra.ph/file/41c80d61324b8eb6fdf79.jpg",
    "https://telegra.ph/file/289fc80322ee85747f418.jpg",
    "https://telegra.ph/file/1a676773b9d64cb9a0d1f.jpg",
    "https://telegra.ph/file/1b3957cfbe38b408f7e75.jpg",
    "https://telegra.ph/file/0debfabaa130874b00484.jpg",
    "https://telegra.ph/file/8fbaae6bba0edef30c3c6.jpg",
    "https://telegra.ph/file/91b93a50eb7c20bd4762b.jpg",
    "https://telegra.ph/file/6903168cfb51b15b143c1.jpg",
    "https://telegra.ph/file/58d937e590df6f2fe466f.jpg",
    "https://telegra.ph/file/c1f702981b922e1aa8d12.jpg",
    "https://telegra.ph/file/715131533c728b3899209.jpg",
    "https://telegra.ph/file/af45acb269103796ee9cb.jpg",
    "https://telegra.ph/file/d4755f438d3dedf08e6c8.jpg",
    "https://telegra.ph/file/48927f80bbb0f0d6f8dd0.jpg",
    "https://telegra.ph/file/52f042477354d4fc0c0c9.jpg",
    "https://telegra.ph/file/d5aeba1f3d933173234bf.jpg",
    "https://telegra.ph/file/44cb6427929b55bf4f864.jpg",
    "https://telegra.ph/file/14e1e647e0f95042d10d9.jpg",
];
