/*
Jangan Hapus Wm Bang 

*The Movie Search & Detail  Plugins Esm*

Kapan 600p nya 😡

*[Sumber]*
https://whatsapp.com/channel/0029Vb3u2awADTOCXVsvia28

*[Sumber Scrape]*

https://whatsapp.com/channel/0029Vb8O2p85vKA89LVbD52J/125
*/

import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const [subcommand, ...args] = text.split(' ');
  const query = args.join(' ');

  if (!subcommand) return m.reply(`Gunakan format:\n${usedPrefix}${command} search <judul>\n${usedPrefix}${command} detail <url>`);

  try {
    if (subcommand === 'search') {
      if (!query) return m.reply('Mau Cari Apa \n\n *Example :* .moviedb search Solo Traveling* ');
      const searchResults = await movsearch(query);
      if (searchResults.length === 0) return m.reply('Tidak ada hasil ditemukan.');

      let searchMessage = 'Search :\n';
      searchResults.forEach((result, index) => {
        searchMessage += `\n${index + 1}. ${result.title}\n*• Name :* ${result.name}\n\n*• Link :* ${result.url}`;
      });

      await m.reply(searchMessage);
    } else if (subcommand === 'detail') {
      if (!query) return m.reply('Mana Url Film Nya? \n\n *Example :* . moviedb detail https://www.themoviedb.org/tv/28665');
      const detailResults = await themovD(query);
      if (detailResults.error) return m.reply('Gagal mengambil detail film.');

      let detailMessage = 'Detail Film :\n';
      detailMessage += `\n- User Score : ${detailResults.users}\n\n`;
      detailMessage += `- Description : ${detailResults.desk}\n`;

      if (detailResults.vote.length > 0) {
        detailMessage += '\nCast:\n';
        detailResults.vote.forEach((cast, index) => {
          detailMessage += `\n${index + 1}. ${cast.orang2}\n   Character : ${cast.char}\n   Episodes : ${cast.eps}\n   Link : ${cast.OrangUrl}`;
        });
      }

      if (detailResults.top.length > 0) {
        detailMessage += '\nTop Contributors :\n';
        detailResults.top.forEach((contributor, index) => {
          detailMessage += `\n${index + 1}. ${contributor.Topnma}\n   Contributions : ${contributor.jumlh}\n   Profile : ${contributor.Toplink}\n`;
        });
      }

      await conn.sendMessage(m.chat, {
        image: { url: detailResults.poster },
        caption: detailMessage
      }, { quoted: m });
    } else {
      m.reply('Subcommand tidak valid. Gunakan "search" atau "detail".');
    }
  } catch (error) {
    console.error(error);
    m.reply('Terjadi kesalahan saat memproses permintaan.');
  }
};

handler.help = ['moviedb <search|detail> <query>'];
handler.command = ['moviedb'];
handler.tags = ['search'];

export default handler;

async function movsearch(query) {
  const url = `https://www.themoviedb.org/search/movie?query=${encodeURIComponent(query)}`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const film = [];

    $('a.result').each((index, element) => {
      const title = $(element).find('h2').text().trim();
      const name = $(element).find('span.title').text().trim();
      const href = $(element).attr('href');
      if (title && name && href) {
        film.push({
          title: title,
          name: name,
          url: `https://www.themoviedb.org${href}`
        });
      }
    });
    return film;
  } catch (error) {
    return [];
  }
}

async function themovD(linkhal) {
  try {
    const { data } = await axios.get(linkhal);
    const $ = cheerio.load(data);

    const poster = $('.blurred img.poster').attr('src') || '';
    const users = $('.user_score_chart').attr('data-percent') || '';
    const desk = $('.overview p').text().trim();

    const vote = [];
    $('.people.scroller li.card').each((index, element) => {
      const OrangUrl = `https://www.themoviedb.org${$(element).find('a').attr('href')}`;
      const orang2 = $(element).find('p a').text().trim();
      const char = $(element).find('.character').text().trim();
      const eps = $(element).find('.episode_count').text().trim();

      if (OrangUrl && orang2) {
        vote.push({
          orang2,
          char,
          eps,
          OrangUrl
        });
      }
    });

    const top = [];
    $('.leaderboard .edit_leader').each((index, element) => {
      const Toplink = `https://www.themoviedb.org${$(element).find('a').attr('href')}`;
      const Topnma = $(element).find('.info a').text().trim();
      const jumlh = $(element).find('.edit_count').text().split('\n')[0].trim();

      if (Toplink && Topnma) {
        top.push({
          Topnma,
          jumlh,
          Toplink
        });
      }
    });

    return {
      poster,
      users,
      desk,
      vote,
      top
    };
  } catch (error) {
    return {
      error: 'Gagal mengambil data'
    };
  }
}