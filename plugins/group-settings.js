let handler = async (m, { conn, command }) => {
    let isClose = {
        close: "announcement",
        open: "not_announcement",
        lock: "locked",
        unlock: "unlocked",
    }[command];

    if (isClose === undefined) {
        throw `
*Format salah! Contoh :*
  *○ ${usedPrefix}close*
  *○ ${usedPrefix}open*
  *○ ${usedPrefix}unlock*
  *○ ${usedPrefix}lock*
`.trim();
    }

    await conn.groupSettingUpdate(m.chat, isClose);
};

handler.help = ["close", "open", "unlock", "lock"];
handler.tags = ["group"];
handler.command = /^(close|open|unlock|lock)$/i;

handler.admin = true;
handler.botAdmin = true;

export default handler;
