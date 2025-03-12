import axios from 'axios'

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} https://vt.tiktok.com/ZSFJnLnen/`
    if (!text) return m.reply(input)
    
    m.react('⏱️')
    try {
        const { data } = await tiktok(text)
        
        const results = await data.medias.filter(item => item.quality === "hd").map(item => item.url);
                
        
            let caption = `💬: ${data.title}\n▶️: ${data.duration}\n🎦: HD\n🔗: ${text}`
            
            
                conn.sendFile(m.chat,
                    results,
                    '',
                    caption,
                    m)
await conn.delay(500)
            
            m.react('✅')
        
    } catch (e) {
        throw e
    }
}
handler.help = ['tiktok'].map((v) => v + ' <url> [hd]');
handler.tags = ['downloader'];
handler.command = /^t(t|iktok(d(own(load(er)?)?|l))?|td(own(load(er)?)?|l))$/i;
 
handler.disable = false
handler.register = true
handler.limit = true
 
export default handler

 async function tiktok(url) {
    const urls = { url };
    try {
        const response = await axios.post('https://snaptikapp.me/wp-json/aio-dl/video-data', urls, {
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36',
            }
        });
        const data = response.data;
        const result = {
            data: data,
        };

        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        return error.message;
    }
}
 