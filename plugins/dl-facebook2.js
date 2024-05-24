import fetch from 'node-fetch';

const MyApiRestBaseUrl = 'https://api.cafirexos.com';
const MyApiRestApikey = 'BrunoSobrino';

const waitMessage = 'Please wait...';
const errorMessage = 'Error while downloading the video.';
const invalidLinkMessage = 'Provide a valid FB Link Example: https://fb.watch';


const handler = async (m, { conn, args, command, usedPrefix }) => {
  if (!args[0]) throw invalidLinkMessage;
  const linkface = await isValidFacebookLink(args[0]);
  if (!linkface) throw invalidLinkMessage;
  let enviando = true;
  try {
    await m.reply(waitMessage);
    const response = await fetch(`${MyApiRestBaseUrl}/api/facebook?url=${args[0]}&apikey=${MyApiRestApikey}`);
    const data = await response.json();
    let linkdl = '';
    if (data?.status === true) {
      linkdl = `${data.resultado.data}`;
    } else {
      linkdl = 'Error downloading video';
      enviando = false;
    }
    conn.sendMessage(m.chat, { video: { url: linkdl }, filename: 'error.mp4', caption: `_*Video downloaded successfully*_` }, { quoted: m });
    enviando = false;
    m.react('✅');
  } catch (err) {
    enviando = false;
    console.error('Error:', err.message);
    throw errorMessage;
  }
};

handler.command = ['fbb'];
export default handler;

async function isValidFacebookLink(link) {
  const validPatterns = [/facebook\.com\/[^/]+\/videos\//i, /fb\.watch\//i, /fb\.com\/watch\//i, /fb\.me\//i, /fb\.com\/video\.php\?v=/i, /facebook\.com\/share\/v\//i, /facebook\.com\/share\/r\//i, /fb\.com\/share\/v\//i, /fb\.com\/share\/r\//i, /facebook\.com\/[^/]+\/posts\/[^/]+\//i, /facebook\.com\/reel\/[^/]+\//i];
  return validPatterns.some(pattern => pattern.test(link));
}
