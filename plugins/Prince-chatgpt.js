import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  
  if (!text && !(m.quoted && m.quoted.text)) {
    m.reply(`Please provide some text or quote a message to get a response.`);
    return;
  }

  // Gunakan teks atau teks yang dikutip sebagai prompt
  let prompt = text || m.quoted.text;

  try {
    m.react("⏳");
    const response = await fetch(`https://api.yanzbotz.my.id/api/ai/gpt5?query=${encodeURIComponent(prompt)}&name=${m.pushName}&content=Hi%20I%20am%20the%20API%20Prince%2C%20created%20by%20DASTAGEER&apiKey=prabowo`);
    const data = await response.json();
    let result = data.result;
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
