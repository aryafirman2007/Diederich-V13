/*
Jangan Hapus Wm Bang 

*MC Addons Explore And Maps Latest  Plugins Esm*

Malas Berfikir 

*[Sumber]*
https://whatsapp.com/channel/0029Vb3u2awADTOCXVsvia28

*[Sumber Scrape]*

https://whatsapp.com/channel/0029Vb2mOzL1Hsq0lIEHoR0N/281

*[Case Source]*

https://whatsapp.com/channel/0029VasjrIh3gvWXKzWncf2P/1343
*/

import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { command }) => {
    async function scrapeBedrock(url) {
        try {
            const { data: html } = await axios.get(url);
            const $ = cheerio.load(html);
            const results = [];

            $('#contentContainer #addon_rows .content-row-cell').each((i, element) => {
                const title = $(element).find('.card-product-title b#product-name').text().trim();
                const relativeLink = $(element).find('.product-card').attr('data-href');
                const link = relativeLink ? `https://www.bedrockexplorer.com${relativeLink}` : null;

                let image = $(element).find('.product-card-wrapper img').first().attr('src');
                if (image && !image.startsWith('http')) {
                    image = `https://www.bedrockexplorer.com${image}`;
                }

                let price = $(element).find('.price-element b').text().trim() || $(element).find('.price-element').text().trim();
                
                results.push({ title, link, image, price });
            });

            return results;
        } catch (error) {
            console.error('Error while scraping:', error);
            return null;
        }
    }

    let targetUrl = command === 'mcaddons' 
        ? 'https://www.bedrockexplorer.com/discover' 
        : 'https://www.bedrockexplorer.com/queries/free-content/everyone/maps/latest';

    let contentType = command === 'mcaddons' ? "Add-ons (Paid & Free)" : "Free Maps";
    let results = await scrapeBedrock(targetUrl);

    if (!results || results.length === 0) return m.reply("No New Content Found");

    let message = `📌 *Minecraft Bedrock ${contentType}*\n\n`;
    results.slice(0, 5).forEach((item, i) => {
        message += `🔹 *${item.title}*\n`;
        message += `🔗 Cek Addon : ${item.link}\n`;
        message += item.price ? `💰 *Harga :* ${item.price}\n\n` : "\n";
    });

    let thumbnail = results[0].image || 'https://cloudkuimages.com/uploads/images/67e291775c15a.jpg';

    await conn.sendMessage(m.chat, {
        image: { url: thumbnail },
        caption: message
    }, { quoted: m });
};

handler.help = ['mcaddons', 'mcmap'];
handler.command = ['mcaddons', 'mcmap'];
handler.tags = ['minecraft'];

export default handler;