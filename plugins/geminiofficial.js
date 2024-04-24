import fetch from 'node-fetch'
var handler = async (m, { text,  usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
if (!text) throw `𝙏𝙋𝙔𝙀 .ai 𝘼𝙉𝘿 𝘼𝙎𝙆 𝙔𝙊𝙐𝙍 𝙌𝙐𝙀𝙎𝙏𝙄𝙊𝙉!`
     }
  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }
try {
  m.react('⏳')
var apii = await fetch(`https://aemt.me/gemini?text=${text}`)
var res = await apii.json()
await m.reply(res.result)
  m.react('✅')
} catch (e) {
await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, fkontak, m)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)
}}
handler.command = ['ai']
handler.help = ['ai']
handler.tags = ['tools']

handler.premium = false

export default handler
