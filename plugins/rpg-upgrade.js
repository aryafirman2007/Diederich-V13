const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    let user = global.db.data.users[m.sender];
    let fishingrod = user.fishingrod * 1;
    let pickaxe = user.pickaxe * 1;
    let sword = user.sword * 1;
    let type = (args[0] || '').toLowerCase();
    let prefix = usedPrefix;

    let lmao1 = `Gunakan Format *${usedPrefix}${command} [type]*
contoh *${usedPrefix}${command} fishingrod*
*📌List yang Bisa Di Upgrade*
${rpg.emoticon('fishingrod')}FishingRod
${rpg.emoticon('pickaxe')}Pickaxe
${rpg.emoticon('sword')}Sword
`.trim();

    switch (type) {
      case 'fishingrod':
        if (fishingrod == 0) {
          m.reply(`anda belum memiliki *🎣FishingRod*\nuntuk mendapatkannya ketik *${usedPrefix}craft fishingrod*`);
        } else if (fishingrod > 9) {
          m.reply(`*${rpg.emoticon('fishingrod')}FishingRod* kamu sudah level max`);
        } else {
          let _kayu = fishingrod * 25;
          let _string = fishingrod * 15;
          let _money = fishingrod * 10000;
          if (user.kayu < _kayu || user.string < _string || user.money < _money) {
            m.reply(`Material kamu kurang!!${user.kayu < _kayu ? `\n${rpg.emoticon('kayu')}Kayu Kamu Kurang *${_kayu - user.kayu}*` : ''}${user.string < _string ? `\n${rpg.emoticon('string')}String Kamu Kurang *${_string - user.string}*` : ''}${user.money < _money ? `\n${rpg.emoticon('money')}Uang Kamu Kurang *${_money - user.money}*` : ''}`);
          } else {
            user.fishingrod += 1;
            user.kayu -= _kayu;
            user.string -= _string;
            user.money -= _money;
            user.fishingroddurability = 0;
            user.fishingroddurability += fishingrod * 50;
            m.reply(`Succes mengupgrade *${rpg.emoticon('fishingrod')}FishingRod*`);
          }
        }
        break;
      case 'pickaxe':
        if (pickaxe == 0) {
          m.reply(`anda belum memiliki *${rpg.emoticon('pickaxe')}Pickaxe*\nuntuk memilikinya ketik *${usedPrefix}craft pickaxe*`);
        } else if (pickaxe > 9) {
          m.reply(`*${rpg.emoticon('pickaxe')}Pickaxe* kamu sudah level max`);
        } else {
          let __batu = pickaxe * 25;
          let __kayu = pickaxe * 15;
          let __money = pickaxe * 15000;
          if (user.batu < __batu || user.kayu < __kayu || user.money < __money) {
            m.reply(`Material Anda Kurang!!${user.batu < __batu ? `\n${rpg.emoticon('batu')}Batu kamu kurang *${__batu - user.batu}*` : ''}${user.kayu < __kayu ? `\n${rpg.emoticon('kayu')}Kayu kamu kurang *${__kayu - user.kayu}*` : ''}${user.money < __money ? `\n${rpg.emoticon('money')}Uang kamu kurang *${__money - user.money}*` : ''}`);
          } else {
            user.pickaxe += 1;
            user.kayu -= __kayu;
            user.batu -= __batu;
            user.money -= __money;
            user.pickaxedurability = 0;
            user.pickaxedurability += pickaxe * 50;
            m.reply(`Succes mengupgrade *${rpg.emoticon('pickaxe')}Pickaxe*`);
          }
        }
        break;
      case 'sword':
        if (sword == 0) {
          m.reply(`anda belum memiliki *${rpg.emoticon('sword')}Sword*\nuntuk memilikinya ketik *${usedPrefix}craft sword*`);
        } else if (sword > 9) {
          m.reply(`*${rpg.emoticon('sword')}Sword* kamu sudah level max`);
        } else {
          let _iron = sword * 25;
          let ___kayu = sword * 15;
          let ___money = sword * 10000;
          if (user.iron < _iron || user.kayu < ___kayu || user.money < ___money) {
            m.reply(`Material Anda Kurang!!${user.iron < _iron ? `\n${rpg.emoticon('iron')}Iron kamu kurang *${_iron - user.iron}*` : ''}${user.kayu < ___kayu ? `\n${rpg.emoticon('kayu')}Kayu kamu kurang *${___kayu - user.kayu}*` : ''}${user.money < ___money ? `\n${rpg.emoticon('money')}Uang kamu kurang *${___money - user.money}*` : ''}`);
          } else {
            user.sword += 1;
            user.iron -= _iron;
            user.kayu -= ___kayu;
            user.money -= ___money;
            user.sworddurability = 0;
            user.sworddurability += sword * 50;
            m.reply(`Succes mengupgrade *${rpg.emoticon('sword')}Sword*`);
          }
        }
        break;
      default:
        m.reply(lmao1);
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

handler.help = ['upgrade'];
handler.tags = ['rpg'];
handler.command = /^(up(grade)?)$/i;
handler.fail = null;

export default handler;
