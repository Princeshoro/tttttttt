import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  
  if (!text && !(m.quoted && m.quoted.text)) {
    return m.reply(`*${lenguajeGB['smsAvisoMG']()}🟣𝙀𝙓𝘼𝙈𝙋𝙇𝙀: *${usedPrefix + command}* What is Islam? \n\nHi🤗 it's gemini-ai you can ask about your any question??`);
  }

  try {
    m.react("⏳");

    let response = await fetch(`https://vihangayt.me/tools/gemini?q=${encodeURIComponent(text)}`);
    const data = await response.json();
    let result = data.data || "*GEMINI-AI API ERROR TRY LATER*";
    m.reply(result);
    m.react("✅");
  } catch (error) {
    console.error('Error:', error); 
    m.reply(`*ERROR*: ${error.message}`);
  }
};

handler.command = ['geminiai', 'gmai'];
handler.diamond = false;

export default handler;
