import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  
  if (!text && !(m.quoted && m.quoted.text)) {
    return m.reply(`*${lenguajeGB['smsAvisoMG']()}🟪𝙀𝙓𝘼𝙈𝙋𝙇𝙀: *${usedPrefix + command}* What is Islam? \nHi😊 it's chatgpt you can ask about code or your question??`);
   }
  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

    // Use the text or quoted text as the prompt
  let prompt = text || m.quoted.text;

  try {
    // React with a heart emoji
    m.react("⏳");
    // Fetch the response from the API
    const response = await fetch(`https://api.bk9.site/ai/chatgpt2/?q=${encodeURIComponent(prompt)}`);
    // Parse the response as JSON
    const data = await response.json();
    // Get the completion from the data
    let result = data.BK9 || "SERVER ERROR";
    // Reply with the result
    m.reply(result);

    // React with a checkmark emoji
    m.react("✅");
  } catch (error) {
    // Log the error
    console.error('Error:', error); 
    // Reply with an error message
    m.reply(`*ERROR*: ${error.message}`);
  }
};
handler.command = ['gpt2'];
handler.diamond = false;

export default handler;
