import didyoumean from 'didyoumean';
import similarity from 'similarity';

let handler = m => m;

handler.before = function (m, { match, usedPrefix }) {
  if ((usedPrefix = (match[0] || '')[0])) {
    let noPrefix = m.text.replace(usedPrefix, '').trim();
    let alias = Object.values(global.plugins)
      .filter(v => v.help && !v.disabled)
      .map(v => v.help)
      .flat(1);
    let mean = didyoumean(noPrefix, alias);
    let sim = similarity(noPrefix, mean);
    let similarityPercentage = parseInt(sim * 100);

    if (mean && noPrefix.toLowerCase() !== mean.toLowerCase()) {
      let response = `• Apakah kamu mencari menu berikut ini?\n\n◦ Nama Command: ➠ *${usedPrefix + mean}*\n◦ Hasil Kemiripan: ➠ *${similarityPercentage}%*`;

      conn.sendMessage(
        m.key.remoteJid,
        {
          image: { url: "https://files.catbox.moe/vfkjca.jpg" },
          caption: response,
          footer: "Inikah?",
          buttons: [
            {
              buttonId: `${usedPrefix + mean}`,
              buttonText: { displayText: `Coba ${usedPrefix + mean}` },
              type: 1,
            },
          ],
          headerType: 1,
          viewOnce: true,
        },
        { quoted: m }
      );
    }
  }
};

export default handler;
