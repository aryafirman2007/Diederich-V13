import axios from 'axios';
import yts from 'yt-search';
import { ytdl } from '../lib/yetehdeel.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
    conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
    let anu = `#jjanime`
    let data = (await yts(anu)).all
    let hasil = data[~~(Math.random() * data.length)]
        let download = await ytdl(`${hasil.url}`);
        let {
      title,
      thumbnail,
      timestamp,
      views,
      ago,
      url
    } = hasil;
    let teks = "\n*" + title + "*" + "\n\n*Durasi:* " + timestamp + "\n*Views:* " + views + "\n*Upload:* " + ago + "\n*Link:* " + url + "\n";
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
        await conn.sendMessage(m.chat, {
            video: {
                url: download.data.mp4,
            },
            caption: teks,
        }, {
            quoted: m,
        });

    } catch (e) {
        throw `❌ Error: ${e.message || e}`;
    }
};

handler.help = ["jjanime"];
handler.tags = ["downloader"];
handler.command = /^(jjanime)$/i;
handler.exp = 0;
handler.register = true;
handler.limit = true;

export default handler;
/*
import { mediafiredl } from "@bochilteam/scraper";
let handler = async (m, { conn }) => {
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
	let lol = [
		"https://www.mediafire.com/file/evkp40q44egr7ts/1.mp4/file",
		"https://www.mediafire.com/file/eb84ntdsbkqaf5z/2.mp4/file",
		"https://www.mediafire.com/file/c3a97hynkjfnoer/3.mp4/file",
		"https://www.mediafire.com/file/nmmb3vz1cj8yyav/8.mp4/file",
		"https://www.mediafire.com/file/e3y5l0yio06c96b/9.mp4/file",
		"https://www.mediafire.com/file/q46wvdso8q1sdh5/10.mp4/file",
		"https://www.mediafire.com/file/jzfmqkbtlu1lkvm/11.mp4/file",
		"https://www.mediafire.com/file/qxa4g3nj4jzimot/12.mp4/file",
		"https://www.mediafire.com/file/rmlkwt6ktkqtlpf/13.mp4/file",
		"https://www.mediafire.com/file/zf4ggxnhr48vb0p/14.mp4/file",
		"https://www.mediafire.com/file/lb8zjiwig3245au/15.mp4/file",
		"https://www.mediafire.com/file/pd03vrjctvfsv1d/16.mp4/file",
		"https://www.mediafire.com/file/tlsq1upcoygj8ol/17.mp4/file",
		"https://www.mediafire.com/file/2i2svx715to3ppj/18.mp4/file",
		"https://www.mediafire.com/file/sdupogchat50afr/19.mp4/file",
		"https://www.mediafire.com/file/etecsu4ivdjjo9l/20.mp4/file",
		"https://www.mediafire.com/file/vqiz8xsyny80njv/21.mp4/file",
		"https://www.mediafire.com/file/527j38bxb757pfd/22.mp4/file",
		"https://www.mediafire.com/file/vwhln9t4osmh0bx/23.mp4/file",
		"https://www.mediafire.com/file/fib82cnbum0c9ps/24.mp4/file",
		"https://www.mediafire.com/file/vrkmh0t6lu6jajo/25.mp4/file",
		"https://www.mediafire.com/file/6srjbm3vup5dtsy/26.mp4/file",
		"https://www.mediafire.com/file/88po3i676qwjnq5/27.mp4/file",
		"https://www.mediafire.com/file/9uksjsyahi7drqc/28.mp4/file",
		"https://www.mediafire.com/file/ma5bxngzjtnbn93/29.mp4/file",
		"https://www.mediafire.com/file/zqeruv06bfxslyc/30.mp4/file",
		"https://www.mediafire.com/file/sgl8xzhomrh3vrd/1.mp4/file",
		"https://www.mediafire.com/file/uiv1xm6g3vzbo1h/2.mp4/file",
		"https://www.mediafire.com/file/utj1wo2q25k25hj/3.mp4/file",
		"https://www.mediafire.com/file/3qh4s2qwjqzl9es/4.mp4/file",
		"https://www.mediafire.com/file/ife00j66vthbqsl/5.mp4/file",
		"https://www.mediafire.com/file/h5ufd14ih2uyj45/6.mp4/file",
		"https://www.mediafire.com/file/7mbss5y6r4rmsgt/7.mp4/file",
		"https://www.mediafire.com/file/dfigs40byxwehv7/8.mp4/file",
		"https://www.mediafire.com/file/cd9w6jkael2lemf/9.mp4/file",
		"https://www.mediafire.com/file/wta9mhx1wyb34lg/10.mp4/file",
		"https://www.mediafire.com/file/s26999ob8590j6m/11.mp4/file",
		"https://www.mediafire.com/file/sgph1b172lgva0o/12.mp4/file",
		"https://www.mediafire.com/file/avxz508fsmes31x/13.mp4/file",
		"https://www.mediafire.com/file/eyeihud53eotktx/14.mp4/file",
		"https://www.mediafire.com/file/vuidq24txzyoqog/15.mp4/file",
		"https://www.mediafire.com/file/42rjn8gq3sts8o6/16.mp4/file",
		"https://www.mediafire.com/file/041fczcyjtkzny0/17.mp4/file",
		"https://www.mediafire.com/file/kcl4bld338sazxo/18.mp4/file",
		"https://www.mediafire.com/file/87oodqlo7l6c545/19.mp4/file",
		"https://www.mediafire.com/file/hdz0tnxe47gnsxf/20.mp4/file",
		"https://www.mediafire.com/file/0dsya7apjwygbdu/21.mp4/file",
		"https://www.mediafire.com/file/yj7fcpwtgarfgfn/22.mp4/file",
		"https://www.mediafire.com/file/ljn8s0upt5tnyra/23.mp4/file",
		"https://www.mediafire.com/file/70dx6rwggqegfim/24.mp4/file",
		"https://www.mediafire.com/file/vtn2aoyk44jcpj4/25.mp4/file",
		"https://www.mediafire.com/file/wod2u5x2ovvym7q/26.mp4/file",
		"https://www.mediafire.com/file/w8mrznpltt28vzu/27.mp4/file",
		"https://www.mediafire.com/file/61ll4jljq12p8vc/28.mp4/file",
		"https://www.mediafire.com/file/6mdalwbr2kw9rya/29.mp4/file",
		"https://www.mediafire.com/file/b70074gi5j50m4w/30.mp4/file",
		"https://www.mediafire.com/file/j4uy1uyug6prv0h/4.mp4/file",
		"https://www.mediafire.com/file/4wqjbj395mg5w34/5.mp4/file",
		"https://www.mediafire.com/file/1v01o60jvszd67p/6.mp4/file",
		"https://www.mediafire.com/file/6wc2d4fikcrpe6y/7.mp4/file",
		"https://www.mediafire.com/file/5rdpxe6ozzllec0/8.mp4/file",
		"https://www.mediafire.com/file/d2otbephb1zxjtn/9.mp4/file",
		"https://www.mediafire.com/file/7vqzs0m4pct8dbn/10.mp4/file",
		"https://www.mediafire.com/file/qiclivyxaq2j5xs/11.mp4/file",
		"https://www.mediafire.com/file/t3f1cy26c60cuz6/12.mp4/file",
		"https://www.mediafire.com/file/qzd7zs2x2sbw0jl/13.mp4/file",
		"https://www.mediafire.com/file/22hylke8lxpc4lg/14.mp4/file",
		"https://www.mediafire.com/file/2guo50g805uiwb6/15.mp4/file",
		"https://www.mediafire.com/file/r6sdpuab7gmhljq/16.mp4/file",
		"https://www.mediafire.com/file/th95a2gs53nwiyr/17.mp4/file",
		"https://www.mediafire.com/file/c7trpumj4q2p43d/18.mp4/file",
		"https://www.mediafire.com/file/jkr648rv08n8njm/19.mp4/file",
		"https://www.mediafire.com/file/wwow69th7pfdaaq/20.mp4/file",
		"https://www.mediafire.com/file/zdglawgywoqb241/21.mp4/file",
		"https://www.mediafire.com/file/4jfb6xobxwcjy0g/22.mp4/file",
		"https://www.mediafire.com/file/ae3590l7fhwvjls/23.mp4/file",
		"https://www.mediafire.com/file/663t6otrfjn4nei/24.mp4/file",
		"https://www.mediafire.com/file/hyq2d4mjlo6y4w4/25.mp4/file",
		"https://www.mediafire.com/file/yuuvfn760zoqasu/26.mp4/file",
		"https://www.mediafire.com/file/w8rw0sleowii5zc/27.mp4/file",
		"https://www.mediafire.com/file/bibxxq7ik77vtlw/28.mp4/file",
		"https://www.mediafire.com/file/c9abjoe6jzm93xj/29.mp4/file",
		"https://www.mediafire.com/file/grlo1luncw6kac5/30.mp4/file",
	];
	let anu = lol[Math.floor(Math.random() * lol.length)];
	
	let lol2 = [
`${anu}`, 
'https://www.mediafire.com/file/v0mcysuzztr3uvd/1.mp4/file', 
'https://www.mediafire.com/file/nyeadgp7ruw40hv/2.mp4/file', 
'https://www.mediafire.com/file/a9xurgeoazs7r04/3.mp4/file', 
'https://www.mediafire.com/file/dcrh2uwvdi2egfk/4.mp4/file', 
'https://www.mediafire.com/file/1vexz9o0a055jx4/5.mp4/file', 
'https://www.mediafire.com/file/34kg7n94b5r4tbr/6.mp4/file', 
'https://www.mediafire.com/file/sfrww7ww32u8ofu/7.mp4/file', 
'https://www.mediafire.com/file/ncdgm0o43r0wm8b/8.mp4/file', 
'https://www.mediafire.com/file/svbolfcj01rij9o/9.mp4/file', 
'https://www.mediafire.com/file/3w5b5t3qqn37bj2/10.mp4/file', 
'https://www.mediafire.com/file/07dgk2ywzeooceh/11.mp4/file', 
'https://www.mediafire.com/file/uqrmf3tj79dpzuw/12.mp4/file', 
'https://www.mediafire.com/file/1vti0r2swfotena/13.mp4/file', 
'https://www.mediafire.com/file/4ac9wlfiqu4mbak/14.mp4/file', 
'https://www.mediafire.com/file/snss4pxqxvxqppl/15.mp4/file', 
'https://www.mediafire.com/file/iixzkzyf99lq4gh/16.mp4/file', 
'https://www.mediafire.com/file/xmtkog706fdebty/17.mp4/file', 
'https://www.mediafire.com/file/62k6sn0ixiu3vd7/18.mp4/file', 
'https://www.mediafire.com/file/6nht4t04vtyqbka/19.mp4/file', 
'https://www.mediafire.com/file/urzjzki8m3byztx/20.mp4/file', 
'https://www.mediafire.com/file/ah4y4efj3kbkc11/21.mp4/file', 
'https://www.mediafire.com/file/cteqbh2lso9mdng/22.mp4/file', 
'https://www.mediafire.com/file/7qh2ofhdlbrdj0n/23.mp4/file', 
'https://www.mediafire.com/file/dd9ta0010daemgb/24.mp4/file', 
'https://www.mediafire.com/file/lcnt4sw0tyjwjwr/25.mp4/file', 
'https://www.mediafire.com/file/a5l3nwxtu5kt3nm/26.mp4/file', 
'https://www.mediafire.com/file/m107c2oqz6zfvk4/1.mp4/file', 
'https://www.mediafire.com/file/fv2mw8x2wf0q3ed/2.mp4/file', 
'https://www.mediafire.com/file/l4b06jhvu99zzbe/3.mp4/file', 
'https://www.mediafire.com/file/xywoh52tnog2rei/4.mp4/file', 
'https://www.mediafire.com/file/nsn1gvby2ezead9/5.mp4/file', 
'https://www.mediafire.com/file/oyauxsuou5122z3/6.mp4/file', 
'https://www.mediafire.com/file/wadn3hggh7i8c8s/7.mp4/file', 
'https://www.mediafire.com/file/haclfjfjrr41x15/8.mp4/file', 
'https://www.mediafire.com/file/7u2f2aoovhx5rq0/9.mp4/file', 
'https://www.mediafire.com/file/vh3rcb345v41san/10.mp4/file', 
'https://www.mediafire.com/file/61ysqfilbb11gdr/11.mp4/file', 
'https://www.mediafire.com/file/jm7r15vxro9onb9/12.mp4/file', 
'https://www.mediafire.com/file/f70o57bbek5egg6/13.mp4/file', 
'https://www.mediafire.com/file/8pjoyvk9gtbd4ox/14.mp4/file', 
'https://www.mediafire.com/file/t5pdiwjucjzhl8b/15.mp4/file', 
'https://www.mediafire.com/file/b8m9z6r7rud5x4v/16.mp4/file', 
'https://www.mediafire.com/file/ignf02xe0d21snb/17.mp4/file', 
'https://www.mediafire.com/file/a4k0wzh2uovitjz/18.mp4/file', 
'https://www.mediafire.com/file/cy30pn9bajndo3o/19.mp4/file', 
'https://www.mediafire.com/file/8g7b6s36tc4gm6r/20.mp4/file', 
'https://www.mediafire.com/file/q5x5wk6vtebrymk/21.mp4/file', 
'https://www.mediafire.com/file/7pvz1vi3g2cl8qn/22.mp4/file', 
'https://www.mediafire.com/file/6xin5was2bl4uwd/23.mp4/file', 
'https://www.mediafire.com/file/2pd4o7zjur69diq/24.mp4/file', 
'https://www.mediafire.com/file/vjlhgfz9jfycign/25.mp4/file', 
'https://www.mediafire.com/file/yskvimf0bn4x3ge/26.mp4/file', 
'https://www.mediafire.com/file/d5fviis1gmkj4cz/27.mp4/file', 
'https://www.mediafire.com/file/qxhptj8wz6bsjrq/1g.mp4/file', 
'https://www.mediafire.com/file/acxujcozd7m12s1/2g.mp4/file', 
'https://www.mediafire.com/file/jj5ti4bfo1ak9wp/3g.mp4/file', 
'https://www.mediafire.com/file/twtnu9bxdq7q16n/4g.mp4/file', 
'https://www.mediafire.com/file/tfi1dlxeh4whlnl/5g.mp4/file', 
'https://www.mediafire.com/file/o57q5rdi9cv7m9r/6g.mp4/file', 
'https://www.mediafire.com/file/dl30z4hx7ixvgp0/7g.mp4/file', 
'https://www.mediafire.com/file/x5byoatyd0zi474/8g.mp4/file', 
'https://www.mediafire.com/file/lnn7auabovq884k/9g.mp4/file', 
'https://www.mediafire.com/file/r7omk0mb6oegtoc/10g.mp4/file', 
'https://www.mediafire.com/file/lou4idrm1p2buax/11g.mp4/file', 
'https://www.mediafire.com/file/1bn0eo8m3xab6dv/12g.mp4/file', 
'https://www.mediafire.com/file/ucknyz3rwahel1r/13g.mp4/file', 
'https://www.mediafire.com/file/2h0xarp01f694xf/14g.mp4/file', 
'https://www.mediafire.com/file/rzu9cxxzku4y89w/15g.mp4/file', 
'https://www.mediafire.com/file/mi5q38lc5oudlal/16g.mp4/file', 
'https://www.mediafire.com/file/eh2m8skd3nqr375/17g.mp4/file', 
'https://www.mediafire.com/file/hgvu9rjfbytpseb/18g.mp4/file', 
'https://www.mediafire.com/file/ba9jk8p36zlmqbt/19g.mp4/file', 
'https://www.mediafire.com/file/poq203kc89msltp/20g.mp4/file', 
'https://www.mediafire.com/file/416myzm67sbjxkk/21g.mp4/file', 
'https://www.mediafire.com/file/g6uh6w65nremiyg/22g.mp4/file', 
'https://www.mediafire.com/file/0el8imcdg4cieof/23g.mp4/file', 
'https://www.mediafire.com/file/0lj1tyw1h0kkfdp/24g.mp4/file', 
'https://www.mediafire.com/file/8ox85e5z3u7t5zw/25g.mp4/file', 
'https://www.mediafire.com/file/ybqbon846gmmznx/26g.mp4/file', 
'https://www.mediafire.com/file/insqyrzn4k35ccc/27g.mp4/file', 
'https://www.mediafire.com/file/3yvgpmh1tx9zja3/28g.mp4/file', 
'https://www.mediafire.com/file/8uhoc38bb4yq1jm/29g.mp4/file', 
'https://www.mediafire.com/file/v1exg9vjhbv4xb5/30g.mp4/file', 
]

let anu2 = lol2[Math.floor(Math.random() * lol2.length)];
	
	let res = await mediafiredl(anu2);
	let { url, url2, filename, ext, aploud, filesize, filesizeH } = res;
	await conn.sendFile(m.chat, url, filename, '```Success...\nDont forget to donate```', m, {
		asDocument: false,
	});
};

handler.help = ["jjanime","jedagjeduganime"];
handler.tags = ["anime","internet"];
handler.command = ["jjanime","jedagjeduganime"];
handler.limit = true
export default handler 
*/