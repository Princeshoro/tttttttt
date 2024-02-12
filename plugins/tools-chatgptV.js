import fetch from 'node-fetch';

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
    // React with a heart emoji
    m.react("⏳")
    // Fetch the response from the API
    const response = await fetch(`https://api.vihangayt.me/tools/chatgpt4`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    // Parse the response as JSON
    const data = await response.json();
   // Get the completion from the data
   let result = data.choices[0].text || "Api server error try again later";
  // Reply with the result
  m.reply(result.trim());

    // React with a pointing down emoji
    m.react("✅")
  } catch (error) {
    // Log the error
    console.error('Error:', error); 
    // Reply with an error message
    m.reply(`*ERROR*: ${error.message}`);
  }
};

handler.command = ['gpt3'];
handler.diamond = false;

export default handler;
