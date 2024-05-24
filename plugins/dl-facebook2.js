import fs from 'fs-extra';
import axios from 'axios';
import fetch from 'node-fetch';

const handler = async (m, { conn, args, command, usedPrefix }) => {
  let fkontak = {
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

  if (!args[0]) return conn.reply(m.chat, `${lenguajeGB['smsAvisoMG']()}𝙂𝙄𝙑𝙀 𝙁𝘽 𝙑𝙄𝘿𝙀𝙊 𝙇𝙄𝙉𝙆 \n𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*${usedPrefix + command} 𝘺𝘰𝘶𝘳 𝘷𝘪𝘥𝘦𝘰 𝘶𝘳𝘭 𝘩𝘦𝘳𝘦`, fkontak, m)
  if (!args[0].match(/www.facebook.com|fb.watch/g)) return conn.reply(m.chat, `${lenguajeGB['smsAvisoMG']()}𝙂𝙄𝙑𝙀 𝙁𝘽 𝙑𝙄𝘿𝙀𝙊 𝙇𝙄𝙉𝙆 \n𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*${usedPrefix + command} 𝘺𝘰𝘶𝘳 𝘷𝘪𝘥𝘦𝘰 𝘶𝘳𝘭 𝘩𝘦𝘳𝘦*`, fkontak, m)

  m.reply(waitt)

  try {
    let res = await fetch(`https://api-smd.onrender.com/api/fbdown?url=${args[0]}`);
    const Jjson = await res.json();
    let video = Jjson.result[0];

    if (!video || !video.status) {
      return await conn.reply(m.chat, "Invalid Video URL!", fkontak, m);
    }

    return await conn.sendMessage(
      m.chat,
      {
        video: {
          url: video.result.Normal_video, // Assuming you want the normal quality video
        },
        caption: `${vidcap}`,
      },
      {
        quoted: m,
      }
    );
  } catch (error) {
    await conn.reply(m.chat,
      error + "\n\nCommand: " + command,
      fkontak,
      {
        quoted: m,
      }
    );
  }
}

handler.command = ['fbb'];
export default handler
