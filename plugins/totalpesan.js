

import { createCanvas, loadImage } from "canvas";

async function getPP(sock, jid) {
  try {
    return await sock.profilePictureUrl(jid, "image");
  } catch {
    return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
  }
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === "undefined") stroke = true;
  if (typeof radius === "number") radius = { tl: radius, tr: radius, br: radius, bl: radius };
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

let handler = async (m, { conn, participants }) => {
  if (!global.db.data.totalPesan) global.db.data.totalPesan = {};
  if (!global.db.data.totalPesan[m.sender]) global.db.data.totalPesan[m.sender] = 0;
  global.db.data.totalPesan[m.sender] += 1;

  let messageCounts = participants.map(p => ({
    jid: p.id,
    count: global.db.data.totalPesan[p.id] || 0
  }));

  messageCounts.sort((a, b) => b.count - a.count);
  let top8 = messageCounts.slice(0, 8);
  let totalPesanSemua = messageCounts.reduce((acc, cur) => acc + cur.count, 0);
  let totalPesanKamu = global.db.data.totalPesan[m.sender];

  const canvasWidth = 1280, canvasHeight = 720;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");

  try {
    const bg = await loadImage("https://files.catbox.moe/gmwn5m.jpg");
    ctx.drawImage(bg, 0, 0, canvasWidth, canvasHeight);
  } catch {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  let overlay = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  overlay.addColorStop(0, "rgba(0,0,0,0.5)");
  overlay.addColorStop(1, "rgba(0,0,0,0.7)");
  ctx.fillStyle = overlay;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, canvasWidth - 40, canvasHeight - 40);

  ctx.font = "bold 70px sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText("Top 8 Pengirim Pesan", canvasWidth / 2, 100);

  let rowStartY = 170, rowHeight = 70, rowMargin = 20;

  for (let i = 0; i < top8.length; i++) {
    let user = top8[i];
    let username = user.jid.split("@")[0];
    let ppUrl = await getPP(conn, user.jid);
    let ppImg;

    try {
      ppImg = await loadImage(ppUrl);
    } catch {
      ppImg = await loadImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60");
    }

    let rowY = rowStartY + i * (rowHeight + rowMargin);
    let cardX = 100, cardY = rowY, cardW = canvasWidth - 200, cardH = rowHeight;
    ctx.fillStyle = i < 3 ? "rgba(255,215,0,0.4)" : "rgba(255,255,255,0.2)";
    roundRect(ctx, cardX, cardY, cardW, cardH, 15, true, true);

    let ppSize = cardH - 10;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cardX + ppSize / 2 + 10, cardY + cardH / 2, ppSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(ppImg, cardX + 10, cardY + (cardH - ppSize) / 2, ppSize, ppSize);
    ctx.restore();

    ctx.font = "bold 35px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.fillText(`${i + 1}. @${username}`, cardX + ppSize + 30, cardY + cardH / 2 - 5);
    ctx.font = "35px sans-serif";
    ctx.fillStyle = "#ffdd00";
    ctx.fillText(`${user.count} pesan`, cardX + ppSize + 30, cardY + cardH / 2 + 30);
  }

  let caption = "*🏆 Top 8 Pengirim Pesan:*\n\n";
  let mentions = [];

  for (let i = 0; i < top8.length; i++) {
    let user = top8[i];
    let username = user.jid.split("@")[0];
    caption += `*${i + 1}. @${username}* (${user.count} pesan)\n`;
    mentions.push(user.jid);
  }

  caption += `\n📊 *Total Pesan Grup:* ${totalPesanSemua}`;
  caption += `\n✉️ *Pesan Kamu:* ${totalPesanKamu}`;

  conn.sendMessage(m.chat, { image: canvas.toBuffer(), caption }, { mentions });

  global.db.data.users[m.sender].exp += Math.floor(Math.random() * 20);
};

handler.command = ["totalpesan"];
handler.tags = ["group"];
handler.help = ["totalpesan"];
handler.group = true;
handler.admin = false;

export default handler;