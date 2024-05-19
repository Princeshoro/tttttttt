import { tiktokdl } from '@bochilteam/scraper';
import fg from 'api-dylux';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (!args[0] && m.quoted && m.quoted.text) {
    args[0] = m.quoted.text;
  }
  if (!args[0] &&!m.quoted) {
    throw `Give the link of the video Tiktok or quote a tiktok link`;
  }
  if (!args[0].match(/tiktok/gi)) {
    throw `Verify that the link is from TikTok`;
  }

  global.fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

  m.react('⏳');
  m.reply(`⏳ *Wait a moment...*`);

  try {
    const { author: { nickname }, video, description } = await tiktokdl(args[0]);
    const url =
      video.no_watermark2 ||
      video.no_watermark ||
      'https://tikcdn.net' + video.no_watermark_raw ||
      video.no_watermark_hd;

    if (!url) {
      throw global.error;
    }

    let txt = `${vidcap}`;
    
    conn.sendFile(m.chat, url, 'tiktok.mp4', '', fkontak);
  } catch (err) {
    console.error(err);
    try {
      let p = await fg.tiktok(args[0]);
      conn.sendFile(m.chat, p.play, 'tiktok.mp4', txt, fkontak);
    } catch (err) {
      console.error(err);
      m.reply('*An unexpected error occurred*');
    }
  }
};

handler.help = ['tiktok'].map(v => v + 'url>');
handler.tags = ['downloader'];
handler.command = ['ttkk'];

export default handler;
