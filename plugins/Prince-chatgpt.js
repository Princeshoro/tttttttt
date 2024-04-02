import displayLoadingScreen from '../lib/loading.js'
import fetch from 'node-fetch'
import { delay } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!text && !(m.quoted && m.quoted.text)) {    
if (!text) throw `*${lenguajeGB['smsAvisoMG']()}🧊𝙀𝙓𝘼𝙈𝙋𝙇𝙀: *${usedPrefix + command}* 𝙒𝙝𝙖𝙩 𝙞𝙨 𝙄𝙨𝙡𝙖𝙢??`     
 }
  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }
try {
    m.react('⏳')
    //await displayLoadingScreen(conn, m.chat)

    const prompt = encodeURIComponent(text);
    let apiurl = `https://ultimetron.guruapi.tech/gpt4?prompt=${prompt}`

    const result = await fetch(apiurl);
    const response = await result.json();
    console.log(response)
    const textt = response.result.reply;
    await typewriterEffect(conn, m.chat, textt);

  } catch (error) {
    console.error(error);
    m.reply('*ERROR FROM SERVER*');
  }
}

handler.help = ['gemini <text>']
handler.tags = ['tools']
handler.command = /^(gpt4)$/i

export default handler

async function typewriterEffect(conn, chatId, text) {
  for (let i = 0; i < text.length; i++) {
    const noobText = text.slice(0, i + 1);
    await conn.sendMessage(chatId, { text: noobText });
    await delay(100); // Adjust the delay time (in milliseconds) as needed
  }
}
