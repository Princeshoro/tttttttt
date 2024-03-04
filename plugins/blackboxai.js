import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  
  if (!text && !(m.quoted && m.quoted.text)) {
    return m.reply(`*${lenguajeGB['smsAvisoMG']()}⚫𝙀𝙓𝘼𝙈𝙋𝙇𝙀: *${usedPrefix + command}* Hi😊 it's blackboxai you ask about code or your question??`);
  }

  let prompt = text || m.quoted.text;

  try {
    m.react("⏳");
    let response = await fetch(`https://vihangayt.me/tools/blackboxv4?q=${encodeURIComponent(prompt)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json();
    let result = data.result;
    m.reply(result);
    m.react("✅");
  } catch (error) {
    console.error('Error:', error); 
    m.reply(`*ERROR*: ${error.message}`);
  }
};

handler.command = ['blackboxai', 'bxai'];
handler.diamond = false;

export default handler;
