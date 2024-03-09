import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  
  if (!text && !(m.quoted && m.quoted.text)) {
    m.reply(`*${lenguajeGB['smsAvisoMG']()}💗𝙀𝙓𝘼𝙈𝙋𝙇𝙀: ${usedPrefix + command} 𝙒𝙝𝙖𝙩 𝙞𝙨 𝙄𝙨𝙡𝙖𝙢??`);
    return;

  }
  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  // Gunakan teks atau teks yang dikutip sebagai prompt
 // let prompt = text || m.quoted.text;

  try {
    m.react("⏳");
    const response = await fetch(`https://api.vihangayt.asia/ai/chatgpt?q=${encodeURIComponent(text)}&name=${m.pushName}&content=Hi%20I%20am%20Prince%2C%20created%20by%20DASTAGEER`);
    const data = await response.json();
    let result = data.data || "*CHATGPT API ERROR TRY LATER*";
    m.reply(result);
    m.react("✅");
  } catch (error) {
    console.error('Error:', error); 
    m.reply(`*ERROR*: ${error}`);
  }
};

handler.command = ['gds', 'gpt4'];
handler.diamond = false;

export default handler;
