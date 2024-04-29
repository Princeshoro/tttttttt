import fetch from 'node-fetch';
import axios from 'axios';
import { mime } from 'mime-types';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) throw `${lenguajeGB['smsAvisoMG']()}𝙀𝙉𝙏𝙀𝙍 𝘼 𝙄𝙉𝙎𝙏𝘼𝙂𝙍𝘼𝙈 𝙇𝙄𝙉𝙆 𝙏𝙊 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿 𝙔𝙊𝙐𝙍 𝙑𝙄𝘿𝙀𝙊 𝙊𝙍 𝙄𝙈𝘼𝙂𝙀\n🧊𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*${usedPrefix + command} https://www.instagram.com/p/CCoI4DQBGVQ/?igshid=YmMyMTA2M2Y=*`

    const { key } = await conn.sendMessage(m.chat, { text: wait }, { quoted: fkontak });
    await conn.sendMessage(m.chat, { text: waitt, edit: key });
    await conn.sendMessage(m.chat, { text: waittt, edit: key });
    await conn.sendMessage(m.chat, { text: waitttt, edit: key });

    try {
        const url = args[0];
        const apiUrl = `https://aiodownloader.onrender.com/download?url=${encodeURIComponent(url)}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`API Error (${response.status}): ${errorMessage}`);
        }

        const result = await response.json();
        const { status, data } = result;

        if (status && data && data.low) {
            const mediaUrl = data.low;
            const mediaType = mime.extension(mediaUrl);
            const fileName = `instagram_media.${mediaType}`;

            let cap = `${vidcap}\n\n${wm}`.trim();

            const response = await axios({
                url: mediaUrl,
                method: 'GET',
                responseType: 'arraybuffer'
            });

            const fileBuffer = Buffer.from(response.data, 'binary');

            if (mediaType === 'jpg' || mediaType === 'jpeg') {
                await conn.sendMessage(m.chat, { image: fileBuffer, mimetype: 'image/' + mediaType, fileName, caption: cap }, { quoted: m });
            } else if (mediaType === 'mp4') {
                await conn.sendMessage(m.chat, { video: fileBuffer, mimetype: 'video/' + mediaType, fileName, caption: cap }, { quoted: m });
            } else {
                throw newError('Unsupported media type');
            }
        }
    } catch (error) {
        console.error('Error while processing Instagram media:', error);
        return m.reply(`An error occurred: ${error.message}`);
    }
}

handler.help = ['instagram <link ig>']
handler.tags = ['downloader']
handler.command = /^(instagram|ig(dl)?)$/i
export default handler;
