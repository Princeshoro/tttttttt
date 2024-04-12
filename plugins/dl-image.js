import { googleImage } from '@bochilteam/scraper'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `${lenguajeGB['smsAvisoMG']()}𝙐𝙎𝙀 𝙏𝙃𝙀 𝘾𝙊𝙈𝙈𝘼𝙉𝘿 𝙇𝙄𝙆𝙀 𝙏𝙃𝙄𝙎\n*${usedPrefix + command} Nature*`
  
  const prohibited = ['fuck', 'porn', 'cum', 'pussy', 'hentai', 'mia khalifa', 'pornhub', 'xnxx', 'xvideos', 'vagina', 'horny', 'ass', 'nude', 'nsfw', 'sex', 'blowjob', 'anal', '+18', 'hot', 'xxx']
  if (prohibited.some(word => m.text.toLowerCase().includes(word))) return m.reply('*⚠️OHY Lanati, GDS-MD ak Muslim bot hai gatya images support nhi krta*')      

  const match = text.match(/(\d+)/);
  const numberOfImages = match ? parseInt(match[3]) : 3;

  for (let i = 0; i < numberOfImages; i++) { 
    const res = await googleImage(text)
    let image = res.getRandom()
    let link = image
    conn.sendFile(m.chat, link, 'error.jpg', `*💞𝙍𝙚𝙨𝙪𝙡𝙩: ${text}*`, m)
  }
}

handler.help = ['gimage <query>', 'imagen <query>']
handler.tags = ['internet', 'Downloader']
handler.command = /^(gimage|image|imagen|img)$/i

export default handler
