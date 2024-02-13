import ws from 'ws';
async function handler(m, { conn: _envio, usedPrefix }) {
const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
function convertirMsADiasHorasMinutosSegundos(ms) {
var segundos = Math.floor(ms / 1000);
var minutos = Math.floor(segundos / 60);
var horas = Math.floor(minutos / 60);
var días = Math.floor(horas / 24);
segundos %= 60;
minutos %= 60;
horas %= 24;
var resultado = "";
if (días !== 0) {
resultado += días + " días, ";
}
if (horas !== 0) {
resultado += horas + " horas, ";
}
if (minutos !== 0) {
resultado += minutos + " minutos, ";
}
if (segundos !== 0) {
resultado += segundos + " segundos";
}
return resultado;
}
const message = users.map((v, index) => `(${index + 1})\n🐈 wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}estado\n*👥 𝙉𝘼𝙈𝙀 :* *${v.user.name || '-'}*\n*🔰 𝘼𝘾𝙏𝙄𝙑𝙀 𝙏𝙄𝙈𝙀 :* ${ v.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime) : "𝙐𝙉𝙆𝙉𝙊𝙒𝙉"}`).join('\n\n••••••••••••••••••••••••••••••••••••\n\n');
  const replyMessage = message.length === 0 ? '*𝗡𝗢 𝗦𝗨𝗕 𝗕𝗢𝗧𝗦 𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘. 𝗖𝗛𝗘𝗖𝗞 𝗕𝗔𝗖𝗞 𝗟𝗔𝗧𝗘𝗥.*' : message;
const totalUsers = users.length;
const responseMessage = `😺 𝗟𝗜𝗦𝗧 𝗢𝗙 𝗔𝗖𝗧𝗜𝗩𝗘 𝗦𝗨𝗕𝗕𝗢𝗧𝗦 (𝗦𝗘𝗥𝗩𝗢𝗕𝗢𝗧/𝗝𝗔𝗗𝗜𝗕𝗢𝗧)\n\n🙌 𝗬𝗢𝗨 𝗖𝗔𝗡 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗧𝗛𝗘𝗠 𝗧𝗢 𝗔𝗦𝗞 𝗧𝗛𝗘𝗠 𝗧𝗢 𝗝𝗢𝗜𝗡 𝗬𝗢𝗨𝗥 𝗚𝗥𝗢𝗨𝗣, 𝗕𝗘 𝗥𝗘𝗦𝗣𝗘𝗖𝗧𝗙𝗨𝗟\n\n❕ 𝗜𝗙 𝗧𝗛𝗘 𝗧𝗘𝗫𝗧 𝗔𝗣𝗣𝗘𝗔𝗥𝗦 𝗜𝗡 𝗪𝗛𝗜𝗧𝗘 𝗜𝗧 𝗠𝗘𝗔𝗡𝗦 𝗧𝗛𝗔𝗧 𝗧𝗛𝗘𝗥𝗘 𝗔𝗥𝗘 𝗡𝗢 𝗔𝗖𝗧𝗜𝗩𝗘 𝗦𝗨𝗕𝗕𝗢𝗧𝗦\n\n❗ 𝗘𝗔𝗖𝗛 𝗦𝗨𝗕 𝗕𝗢𝗧 𝗨𝗦𝗘𝗥 𝗠𝗔𝗡𝗔𝗚𝗘𝗦 𝗧𝗛𝗘 𝗙𝗨𝗡𝗖𝗧𝗜𝗢𝗡 𝗔𝗦 𝗧𝗛𝗘𝗬 𝗪𝗔𝗡𝗧, 𝗧𝗛𝗘 𝗠𝗔𝗜𝗡 𝗡𝗨𝗠𝗕𝗘𝗥 𝗜𝗦 𝗡𝗢𝗧 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗜𝗕𝗟𝗘\n\n🤖 𝗖𝗢𝗡𝗡𝗘𝗖𝗧𝗘𝗗 𝗦𝗨𝗕 𝗕𝗢𝗧𝗦 : ${totalUsers || '0'}\n\n${replyMessage.trim()}`.trim();
await _envio.sendMessage(m.chat, {text: responseMessage, mentions: _envio.parseMention(responseMessage)}, {quoted: m})}
handler.command = handler.help = ['listjadibot', 'bots', 'subsbots'];
handler.tags = ['jadibot'];
handler.owner = true
export default handler;
