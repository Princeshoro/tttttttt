import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text && !(m.quoted && m.quoted.text)) {
      throw `*_Need query._*\n*_Example:_* _${usedPrefix + command} Answer to these_`;
    }

    if (!text && m.quoted && m.quoted.text) {
      text = m.quoted.text;
    }

    m.react('👀');
    conn.sendPresenceUpdate('composing', m.chat);

    const response = await fetch(`https://api.vihangayt.asia/ai/gptimg?q=${encodeURIComponent(text)}`);
    const data = await response.json();

    m.react('✅');

    const result = data.result;
    let yanzx = result.replace(/\!\[\[.*?\]\]\((.*?)\)/g, '');
    conn.reply(m.chat, yanzx, m);
    const regex = /\!\[\[.*?\]\]\((.*?)\)/g;
    const urls = [];
    let match;

    while ((match = regex.exec(result)) !== null) {
      urls.push(match[1]);
    }

    for (let yanzz of urls) {
      await conn.sendMessage(m.chat, { image: { url: yanzz }, mimetype: 'image/jpeg', caption: `*Image result*` }, { quoted: m });
    }
  } catch (error) {
    throw `*An error occurred. Please try again later.*`;
  }
};

handler.command = /^gptimg$/i;
handler.tags = ['study'];

export default handler;
