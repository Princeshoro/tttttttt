import fetch from 'node-fetch';

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    m.reply('Please provide some text or quote a message to get a response.');
    return;
   }
  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

 // let prompt = text || m.quoted.text;

  try {
    m.react('⏳');
    const response = await fetch(`https://api.bk9.site/ai/chatgpt4?q=+q`);
    const data = await response.json();
    let result = data.completion || "*CHATGPT SEVER ERROR*";
    m.reply(result.trim());
    m.react("✅");
  } catch (error) {
    console.error('Error:', error); 
    m.reply(`*ERROR*: ${error.message}`);
  }
};

handler.command = ['gpt'];
handler.diamond = false;

module.exports = handler;
