import fetch from 'node-fetch';
import axios from 'axios';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) throw `${lenguajeGB['smsAvisoMG']()}𝙀𝙉𝙏𝙀𝙍 𝘼 𝙄𝙉𝙎𝙏𝘼𝙂𝙍𝘼𝙈 𝙇𝙄𝙉𝙆 𝙏𝙊 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿 𝙔𝙊𝙐𝙍 𝙑𝙄𝘿𝙀𝙊 𝙊𝙍 𝙄𝙈𝘼𝙂𝙀\n🧊𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*${usedPrefix + command} https://www.instagram.com/p/CCoI4DQBGVQ/?igshid=YmMyMTA2M2Y=*`

    const { key } = await conn.sendMessage(m.chat, { text: wait }, { quoted: fkontak });
    await conn.sendMessage(m.chat, { text: waitt, edit: key });
    await conn.sendMessage(m.chat, { text: waittt, edit: key });
    await conn.sendMessage(m.chat, { text: waitttt, edit: key });

async function instaDownload(url) {
    try {
        const apiUrl = `https://aiodownloader.onrender.com/download?url=${encodeURIComponent(url)}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`API Error (${response.status}): ${errorMessage}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(`Error with API: ${error.message}`);
        throw error;
    }
}

async function downloadAndSendMedia(m, text) {
    const url = text;

    if (!url) {
        return m.reply(`Where is the link?\n\nExample: ${prefix + command} https://www.instagram.com/p/CK0tLXyAzEI`);
    }

    m.reply('Please wait, downloading media...');

    try {
        const { status, data } = await instaDownload(url);

        if (status && data && data.low) {
            const mediaUrl = data.low;

            const response = await fetch(mediaUrl);
            const bufferArray = await response.arrayBuffer();
            const fileBuffer = Buffer.from(bufferArray);

            const mediaType = mediaUrl.endsWith('.mp4') ? 'video' : 'image';
            const fileName = `instagram_media.${mediaType === 'image' ? 'jpg' : 'mp4'}`;

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
