import fetch from 'node-fetch';

const handler = async (m, { conn, args, command, usedPrefix }) => {
  let enviando = false; // Declare the enviando variable here
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
  if (!enviando) enviando = true
  
  try {
    m.reply(waitt)
    
    const d2ata = await fetch(`https://api-smd.onrender.com/api/fbdown?url=${args[0]}`);
    const r2es = await d2ata.json();
    let linkdl = '';  
    if (r2es?.status === true) {
      linkdl = `${r2es.resultado.data}`;
    } else {
      linkdl = XD  
      enviando = false
    }
    conn.sendMessage(m.chat, {video: {url: linkdl}, filename: 'error.mp4', caption: `_*${vidcap}*_`}, {quoted: m});
    enviando = false
  } catch (err1) {
    enviando = false
    console.log('Error: ' + err1.message)
    throw `_*Error while downloading the video.*`;
  }
};

handler.command = ['fbb'];
export default handler;
