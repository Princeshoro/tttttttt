import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  
  if (!text && !(m.quoted && m.quoted.text)) {
    return m.reply(`*${lenguajeGB['smsAvisoMG']()}⚫𝙀𝙓𝘼𝙈𝙋𝙇𝙀:\n *${usedPrefix + command}* Hi😊 it's blackboxai you can ask about code or your question??`);
  }

 // let prompt = text || m.quoted.text;

  try {
    m.react("⏳");
    const response = await fetch(`https://vihangayt.me/tools/blackboxv4?q=${text}`);
    const data = await response.json();
    let result = data.completion || "*BLACKBOXAI API ERROR TRY LATER*";
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
