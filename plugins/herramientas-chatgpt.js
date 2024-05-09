import fetch from 'node-fetch';
import { delay } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!text && !(m.quoted && m.quoted.text)) {    
if (!text) throw `*${lenguajeGB['smsAvisoMG']()}🧊𝙀𝙓𝘼𝙈𝙋𝙇𝙀: *${usedPrefix + command}* I LOVE PRINCE DASTAGEER😍`     
 }
  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }
  try {
    m.react('⏳');

    const prompt = encodeURIComponent(text);
    let apiurl = `https://api.bk9.site/ai/chatgpt4/?q=${prompt}`
    
    const result = await fetch(apiurl);
    const response = await result.json();
    console.log(response);
      
      m.react('✅');
    const textt = response.BK9;
    await conn.sendMessage(m.chat, { text: textt });

  } catch (error) {
    console.error(error);
    m.reply('*ERROR FROM SERVER*');
  }
}

handler.help = ['gpt <text>']
handler.tags = ['tools']
handler.command = /^(gpt)$/i

export default handler;
