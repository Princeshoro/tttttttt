import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  
  if (!text && !(m.quoted && m.quoted.text)) {
    m.reply(`*${lenguajeGB['smsAvisoMG']()}⚫𝙀𝙓𝘼𝙈𝙋𝙇𝙀: *${usedPrefix + command}* Hi😊 it's blackboxai you ask about code or your question??`);
    return;
  }

  // Use text or quoted text as a prompt
  let prompt = text || m.quoted.text;

  try {
    m.react("⏳");
    let prince = await fetchJson(`https://vihangayt.me/tools/blackboxv4?q=${text}`);
    let data = await prince.json();
    let result = data.result;
    m.reply(result);
    m.react("✅");
  } catch (error) {
    console.error('Error:', error); 
    m.reply(`*ERROR*: ${error}`);
  }
};

handler.command = ['blackboxai', 'bxai'];
handler.diamond = false;

export default handler;
