import fetch from 'node-fetch';
let enviando = false;
const handler = async (m, {conn, args, command, usedPrefix}) => {
  
  if (!args[0]) throw `𝙂𝙄𝙑𝙀 𝙁𝘽 𝙑𝙄𝘿𝙀𝙊 𝙇𝙄𝙉𝙆\n\n_${usedPrefix + command} https://fb.watch_`;
  const linkface = await isValidFacebookLink(args[0])  
  if (!linkface) throw `Provide a valid FB Link Example: \n${usedPrefix + command} https://fb.watch`;
  if (!enviando) enviando = true
  try {
    await m.reply(waitt);
    const d2ata = await fetch(`https://api.cafirexos.com/api/facebook?url=${args[0]}&apikey=BrunoSobrino`);
    const r2es = await d2ata.json();
    let linkdl = '';  
    if (r2es?.status === true) {
      linkdl = `${r2es.resultado.data}`;
    } else {
      linkdl = XD  
      enviando = false
    }
    conn.sendMessage(m.chat, {video: {url: linkdl}, filename: 'error.mp4', caption: `_*${tradutor.texto4}*_`}, {quoted: m});
    enviando = false
    m.react('✅')
  } catch (err1) {
      enviando = false
      console.log('Error: ' + err1.message)
      throw `*Error while downloading the video.*`;
  }
};
handler.command = ['fbb'];
export default handler;


async function isValidFacebookLink(link) {
    const validPatterns = [/facebook\.com\/[^/]+\/videos\//i, /fb\.watch\//i, /fb\.com\/watch\//i, /fb\.me\//i, /fb\.com\/video\.php\?v=/i, /facebook\.com\/share\/v\//i, /facebook\.com\/share\/r\//i, /fb\.com\/share\/v\//i, /fb\.com\/share\/r\//i, /facebook\.com\/[^/]+\/posts\/[^/]+\//i, /facebook\.com\/reel\/[^/]+\//i];
    return validPatterns.some(pattern => pattern.test(link));
}
