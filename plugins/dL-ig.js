import fetch from 'node-fetch';
import axios from 'axios';

const handler = (m, { conn, args, command, usedPrefix }) => {
     if (!args[0]) throw `${lenguajeGB['smsAvisoMG']()}𝙀𝙉𝙏𝙀𝙍 𝘼 𝙄𝙉𝙎𝙏𝘼𝙂𝙍𝘼𝙈 𝙇𝙄𝙉𝙆 𝙏𝙊 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿 𝙔𝙊𝙐𝙍 𝙑𝙄𝘿𝙀𝙊 𝙊𝙍 𝙄𝙈𝘼𝙂𝙀\n🧊𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*${usedPrefix + command} https://www.instagram.com/p/CCoI4DQBGVQ/?igshid=YmMyMTA2M2Y=*`

    const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}
    
    
    const { key } = conn.sendMessage(m.chat, { text: wait }, { quoted: fkontak });
    conn.sendMessage(m.chat, { text: waitt, edit: key });
    conn.sendMessage(m.chat, { text: waittt, edit: key });
    conn.sendMessage(m.chat, { text: waitttt, edit: key });

    function instaDownload(url) {
        return new Promise(async (resolve, reject) => {
            try {
                const apiUrl = `https://aiodownloader.onrender.com/download?url=${encodeURIComponent(url)}`;
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    const errorMessage = await response.text();
                    reject(new Error(`API Error (${response.status}): ${errorMessage}`));
                }

                const result = await response.json();
                resolve(result);
            } catch (error) {
                console.error(`Error with API: ${error.message}`);
                reject(error);
            }
        });
    }

    function downloadAndSendMedia(m, text) {
        const url = text;

        if (!url) {
            return m.reply(`Where is the link?\n\nExample: ${prefix + command} https://www.instagram.com/p/CK0tLXyAzEI`);
        }

        m.reply('Please wait, downloading media...');

        instaDownload(url)
            .then(({ status, data }) => {
                if (status && data && data.low) {
                    const mediaUrl = data.low;

                    fetch(mediaUrl)
                        .then(response => response.arrayBuffer())
                        .then(bufferArray => Buffer.from(bufferArray))
                        .then(fileBuffer => {
                            const mediaType = mediaUrl.endsWith('.mp4') ? 'video' : 'image';
                            const fileName = `instagram_media.${mediaType === 'image' ? 'jpg' : 'mp4'}`;
				
				const cap = `${vidcap}`;

                            if (mediaType === 'jpg' || mediaType === 'jpeg') {
                                conn.sendMessage(m.chat, { image: fileBuffer, mimetype: 'image/' + mediaType, fileName, caption: cap }, { quoted: m });
                            } else if (mediaType === 'mp4') {
                                conn.sendMessage(m.chat, { video: fileBuffer, mimetype: 'video/' + mediaType, fileName, caption: cap }, { quoted: m });
                            } else {
                                throw newError('Unsupported media type');
                            }
                        })
                        .catch(error => {
                            console.error('Error while processing Instagram media:', error);
                            m.reply(`An error occurred: ${error.message}`);
                        });
                }
            })
            .catch(error => {
                console.error('Error while processing Instagram media:', error);
                m.reply(`An error occurred: ${error.message}`);
            });
    }

    handler.help = ['instagram <link ig>']
    handler.tags = ['downloader']
    handler.command = /^(instagram|ig(dl)?)$/i
    return handler;
}

export default handler;
