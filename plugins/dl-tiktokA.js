import fg from 'api-dylux' 
import axios from 'axios'
import cheerio from 'cheerio'
import { tiktok } from "@xct007/frieren-scraper";
let generateWAMessageFromContent = (await import(global.baileys)).default
import { tiktokdl } from '@bochilteam/scraper'

global.fkontak = {
  "key": {
    "participants": "0@s.whatsapp.net",
    "remoteJid": "status@broadcast",
    "fromMe": false,
    "id": "Halo"
  },
  "message": {
    "contactMessage": {
      "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
    }
  },
  "participant": "0@s.whatsapp.net"
};

// ... [rest of your imports and global variable declarations]

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  // Check if the text is provided
  if (!text) {
    return conn.reply(m.chat, `Please provide the TikTok URL.\nExample: ${usedPrefix + command} https://vm.tiktok.com/ZM6n8r8Dk/`, fkontak, m);
  }
  
  // Validate the TikTok URL
  if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) {
    return conn.reply(m.chat, `The provided URL does not seem to be a valid TikTok link.`, fkontak, m);
  }
  
  // Inform the user that the process has started
  await conn.reply(m.chat, `Processing your TikTok download request...`, fkontak, m);

  // Attempt to download using the first method
  try {
    const dataF = await tiktok.v1(args[0]);
    const { author: { nickname }, video, description } = dataF;
    const url = video.no_watermark2 || video.no_watermark || 'https://tikcdn.net' + video.no_watermark_raw || video.no_watermark_hd;
    await conn.sendFile(m.chat, url, 'tiktok.mp4', `Here's your TikTok video download.\nAuthor: ${nickname}\nDescription: ${description}`, m);
  } catch (e1) {
    console.error('Error in first method:', e1);
    
    // Attempt to download using the second method
    try {
      const tTiktok = await tiktokdlF(args[0]);
      await conn.sendFile(m.chat, tTiktok.video, 'tiktok.mp4', `Here's your TikTok video download.\nAuthor: ${nickname}\nDescription: ${description}`, m);
    } catch (e2) {
      console.error('Error in second method:', e2);
      
      // Attempt to download using the third method
      try {
        let p = await fg.tiktok(args[0]);
        await conn.sendFile(m.chat, p.nowm, 'tiktok.mp4', `Here's your TikTok video download.\nAuthor: ${nickname}\nDescription: ${description}`, m);
      } catch (e3) {
        console.error('Error in third method:', e3);
        
        // If all methods fail, inform the user
        await conn.reply(m.chat, `Unable to process your TikTok download request at this time. Please try again later or report this issue.`, fkontak, m);
      }
    }
  }
};
handler.help = ['tiktok']
handler.tags = ['dl']
handler.command = ['ttkk']
//handler.limit = 2
export default handler

async function tiktokdlF(url) {
if (!/tiktok/.test(url)) return 'Enlace incorrecto';
const gettoken = await axios.get("https://tikdown.org/id");
const $ = cheerio.load(gettoken.data);
const token = $("#download-form > input[type=hidden]:nth-child(2)").attr( "value" );
const param = { url: url, _token: token };
const { data } = await axios.request("https://tikdown.org/getAjax?", { method: "post", data: new URLSearchParams(Object.entries(param)), headers: { "content-type": "application/x-www-form-urlencoded; charset=UTF-8", "user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36" }, });
var getdata = cheerio.load(data.html);
if (data.status) {
return { status: true, thumbnail: getdata("img").attr("src"), video: getdata("div.download-links > div:nth-child(1) > a").attr("href"), audio: getdata("div.download-links > div:nth-child(2) > a").attr("href"), }} else
return { status: false }}
