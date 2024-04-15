import fetch from 'node-fetch';
import { googleImage } from '@bochilteam/scraper'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `🅶🅳🆂   ${usedPrefix}${command} 𝐓𝐡𝐞 𝐛𝐞𝐚𝐮𝐭𝐲 𝐨𝐟 𝐒𝐢𝐧𝐝𝐡 `;

    
  }
  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  const match = text.match(/(\d+)/);
  const numberOfImages = match ? parseInt(match[3]) : 3;

  try {
    m.react("♻️");
    m.reply(imgs)

    const images = [];

    for (let i = 0; i < numberOfImages; i++) {
      const res = await googleImage(text)
    let image = res.getRandom()
    let link = image
    
      if (response.ok) {
        const imageBuffer = await response.buffer();
        images.push(imageBuffer);
      } else {
        throw '*Image generation failed*';
      }
    }
    if (!text && m.quoted && m.quoted.text) text = m.quoted.text
    
    let cap = `*💞𝙍𝙚𝙨𝙪𝙡𝙩: ${text}*`;

    for (let i = 0; i < images.length; i++) {
      await conn.sendFile(m.chat, link, images[i], `image_${i + 1}.png`, cap, m);
      m.react("✅")


    }
  } catch {
    throw '*Oops! Something went wrong while generating images. Please try again later.*';
    m.react("❌")
  }
};

handler.help = ['image'];
handler.tags = ['downloader'];
handler.command = ['img2', 'gimage2', 'image2', 'pic2', 'photo2', 'picture2'];

export default handler;
