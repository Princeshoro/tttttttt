import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  
  if (!text && !(m.quoted && m.quoted.text)) {
    return m.reply(`*${lenguajeGB['smsAvisoMG']()}🟪𝙀𝙓𝘼𝙈𝙋𝙇𝙀: *${usedPrefix + command}* What is Islam? \nHi😊 it's blackboxai you can ask about code or your question??`);
   }
  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  try {
    m.react("⏳");

    let response = await fetch(`https://vihangayt.me/tools/blackboxv4?q=${encodeURIComponent(text)}`);
    const data = await response.json();
    let result = data.data || "*BLACKBOXAI API ERROR TRY LATER*";
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
