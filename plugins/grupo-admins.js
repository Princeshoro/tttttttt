let handler = async (m, { conn, participants, groupMetadata, args, usedPrefix, text, command }) => {
  if (!text) return m.reply(`${lenguajeGB['smsAvisoMG']()}𝗘𝗡𝗧𝗘𝗥 𝗔 𝗧𝗘𝗫𝗧 𝗙𝗢𝗥 𝗔𝗡𝗬 𝗥𝗘𝗤𝗨𝗘𝗦𝗧 𝗧𝗛𝗔𝗧 𝗥𝗘𝗤𝗨𝗜𝗥𝗘𝗦 𝗧𝗛𝗘 𝗣𝗥𝗘𝗦𝗘𝗡𝗖𝗘 𝗢𝗙 𝗔𝗗𝗠𝗜𝗡𝗦`)
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/Admins.jpg'
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
let pesan = args.join` `
let oi = `${lenguajeGB.smsAddB5()} _${pesan}_`

let textoA = 
`*⊱ ──── 《.⋅ ⚡ ⋅.》 ──── ⊰*
ෆ ${lenguajeGB.smsAddB3()}
ෆ ${oi}
*⊱ ──── 《.⋅ ${vs} ⋅.》 ──── ⊰*`

let textoB = 
`${listAdmin}

🧊 ${lenguajeGB.smsAddB4()} 🧊`.trim()
await conn.sendFile(m.chat, pp, 'error.jpg', textoA + textoB, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
//await conn.sendButton(m.chat, textoA, textoB, pp, [[lenguajeGB.smsConMenu(), `.menu`]], m, { mentions: [...groupAdmins.map(v => v.id), owner] })
}
handler.command = /^(admins|@admins|dmins)$/i
handler.group = true
export default handler
