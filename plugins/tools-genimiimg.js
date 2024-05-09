import fetch from 'node-fetch';
import uploader from '../lib/uploadImage.js';

const handler = async (m, { conn, text, command, usedPrefix }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
        let buffer = await q.download();
        await m.reply('Getting wait...');
        let media = await uploader(buffer);
        let json = await (await fetch(`https://api.bk9.site/ai/geminiimg?url=${media}&q=${text}`)).json();
        conn.sendMessage(m.chat, { text: json.result }, { quoted: m });
    } else {
        throw `𝙍𝙀𝙋𝙇𝙔 𝙏𝙊 𝘼𝙉 𝙄𝙈𝘼𝙂𝙀 𝙒𝙄𝙏𝙃 𝙏𝙀𝙓𝙏\n\n🧊𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*${usedPrefix + command}* 𝙩𝙚𝙡𝙡 𝙖𝙗𝙤𝙪𝙩 𝙞𝙩.`;
    }
};

handler.help = ['gmimg'];
handler.tags = ['tools'];
handler.command = /^(gmimg|gmimage)$/i;

//handler.limit = true;

export default handler;
