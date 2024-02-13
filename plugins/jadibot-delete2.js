import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs';
import path from 'path';
const handler = async (m, { conn, usedPrefix }) => {
const chatId = m.isGroup ? m.chat : m.sender;
const uniqid = chatId.split('@')[0];
const sessionPath = './Session/';
try {
const files = await fs.readdir(sessionPath);
let filesDeleted = 0;
for (const file of files) {
if (file.includes(uniqid)) {
await fs.unlink(path.join(sessionPath, file));
filesDeleted++;
}}
if (filesDeleted === 0) {
await conn.sendMessage(m.chat, { text: `${lenguajeGB['smsAvisoAG']()}𝗡𝗢 𝗙𝗜𝗟𝗘𝗦 𝗙𝗢𝗨𝗡𝗗 𝗪𝗛𝗜𝗖𝗛 𝗜𝗡𝗖𝗟𝗨𝗗𝗘𝗦 𝗧𝗛𝗔𝗧 𝗖𝗛𝗔𝗧 𝗜𝗗` }, { quoted: m });
} else {
await conn.sendMessage(m.chat,
{ text: `${lenguajeGB['smsAvisoEG']()}𝙎𝙏𝙍𝙐𝘾𝙆 𝙊𝙐𝙏 ${filesDeleted} 𝗦𝗘𝗦𝗦𝗜𝗢𝗡 𝗔𝗥𝗖𝗛𝗜𝗩𝗘𝗦` },
{ quoted: m }
)}
} catch (err) {
console.error(`${lenguajeGB['smsAvisoFG']()}𝗦𝗘𝗦𝗦𝗜𝗢𝗡 𝗙𝗢𝗟𝗗𝗘𝗥 𝗢𝗥 𝗔𝗥𝗖𝗛𝗜𝗩𝗘 𝗗𝗢𝗘𝗦𝗡'𝗧 𝗘𝗫𝗜𝗦𝗧`, err);
await conn.sendMessage(m.chat,
{ text: `${lenguajeGB['smsAvisoFG']()}𝗔𝗡 𝗘𝗥𝗥𝗢𝗥 𝗢𝗖𝗖𝗨𝗥𝗥𝗘𝗗 𝗪𝗛𝗜𝗟𝗘 𝗗𝗘𝗟𝗘𝗧𝗜𝗡𝗚 𝗧𝗛𝗘 𝗦𝗘𝗦𝗦𝗜𝗢𝗡 𝗙𝗜𝗟𝗘𝗦` },
{ quoted: m }
)}
await conn.sendMessage(m.chat, {text: `${lenguajeGB['smsAvisoRG']()}💗 𝗛𝗜 𝗜𝗧𝗦 𝗪𝗢𝗥𝗞𝗜𝗡𝗚 𝗔𝗟𝗥𝗘𝗔𝗗𝗬\n𝗜𝗙 𝗧𝗛𝗘 𝗕𝗢𝗧 𝗗𝗢𝗘𝗦𝗡'𝗧 𝗥𝗘𝗦𝗣𝗢𝗡𝗗 𝗧𝗢 𝗬𝗢𝗨𝗥 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 𝗣𝗟𝗘𝗔𝗦𝗘 𝗗𝗢 𝗔 𝗟𝗜𝗧𝗧𝗟𝗘 𝗦𝗣𝗔𝗠\n\n*𝗘𝗫𝗔𝗠𝗣𝗟𝗘:*\n${usedPrefix}s\n${usedPrefix}s\n${usedPrefix}s`}, { quoted: m })};
handler.help = ['deletebot'];
handler.tags = ['jadibot'];
handler.command = /^(msgespera|ds|jadidlt)$/i;
handler.owner = true
export default handler;
