import fetch from 'node-fetch';
import { delay } from '@whiskeysockets/baileys';

let handler = async (m, { text, usedPrefix, command }) => {
  // Check if the text or quoted text is provided
  if (!text && !(m.quoted && m.quoted.text)) {
    // Send a message to the user asking for input
    m.reply(`Please provide some text or quote a message to get a response.`);
    // Exit the function
    return;
  }
  
    // Use the text or quoted text as the prompt
  let prompt = text || m.quoted.text;
  
  try {
    m.react('⏳');

      
    let apiurl = `https://api.bk9.site/ai/chatgpt4/?q=${encodeURIComponent(prompt)}`
    
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
