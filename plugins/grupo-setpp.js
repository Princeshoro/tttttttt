let handler = async (m, { conn, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/image/.test(mime)) {
let img = await q.download()
if (!img) throw `${lenguajeGB['smsAvisoMG']()}️𝗥𝗘𝗣𝗟𝗬 𝗪𝗜𝗧𝗛 𝗔𝗡 𝗜𝗠𝗔𝗚𝗘`
await conn.updateProfilePicture(m.chat, img).then(_ => m.reply(`${lenguajeGB['smsAvisoEG']()}𝗧𝗛𝗘 𝗚𝗥𝗢𝗨𝗣 𝗣𝗥𝗢𝗙𝗜𝗟𝗘 𝗛𝗔𝗦 𝗕𝗘𝗘𝗡 𝗖𝗛𝗔𝗡𝗚𝗘𝗗`))
} else throw `${lenguajeGB['smsAvisoMG']()}️𝗥𝗘𝗣𝗟𝗬 𝗪𝗜𝗧𝗛 𝗔𝗡 𝗜𝗠𝗔𝗚𝗘 `}
handler.command = /^setpp(group|grup|gc)?$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
