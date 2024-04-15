import fg from 'api-dylux' 
import axios from 'axios'
import cheerio from 'cheerio'
import { tiktok } from "@xct007/frieren-scraper";
let generateWAMessageFromContent = (await import(global.baileys)).default
import { tiktokdl } from '@bochilteam/scraper'

let handler = async (m, { conn, text, args, usedPrefix, command}) => {
  if (!text) throw `_*PRINCE TIKTOK DL*_\n\n*_Past a tiktok link._*\n\n*_Example:_* _${usedPrefix + command} Url here_`;
  if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) throw `_*PRINCE TIKTOK DL*_\n\n*_Enter a TikTok link._*\n\n*_Example:_* _${usedPrefix + command} Url here_`;

  try {
    const dataF = await fg.tiktok(args[0]);
    conn.sendFile(m.chat, dataF.nowm, 'tiktok.mp4', `⛱️ ${m.sender.username}\n${dataF.author.nickname}\n${dataF.description ? '\n⛱️ ' + dataF.author.uniqueId + '\n' + dataF.description : ''}\n${wm}`.trim(), m);
  } catch (e1) {
    try {
      const tTiktok = await fg.tiktok(args[0]);
      conn.sendFile(m.chat, tTiktok.nowm, 'tiktok.mp4', `⛱️ ${m.sender.username}\n${tTiktok.author.nickname}\n${tTiktok.description ? '\n⛱️ ' + tTiktok.author.uniqueId + '\n' + tTiktok.description : ''}\n${wm}`.trim(), m);
    } catch (e2) {
      try {
        const p = await fg.tiktok(args[0]);
        conn.sendFile(m.chat, p.nowm, 'tiktok.mp4', `⛱️ ${m.sender.username}\n${p.author.nickname}\n${p.description ? '\n⛱️ ' + p.author.uniqueId + '\n' + p.description : ''}\n${wm}`.trim(), m);
      } catch (e3) {
        try {
          const { author: { nickname }, video, description } = await fg.tiktok(args[0]);
          const url = video.no_watermark2 || video.no_watermark || 'https://tikcdn.net' + video.no_watermark_raw || video.no_watermark_hd;
          conn.sendFile(m.chat, url, 'tiktok.mp4', `⛱️ ${m.sender.username}\n${nickname}\n${description ? '\n⛱️ ' + dataF.author.uniqueId + '\n' + description : ''}\n${wm}`.trim(), m);
        } catch (e) {
          await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`.trim(), m);
          console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`);
          console.log(e);
          handler.limit = false;
        }
      }
    }
  }
};

handler.help = ['tiktok'];
handler.tags = ['dl'];
handler.command = ['ttkk'];
//handler.limit = 2;
export default handler;

