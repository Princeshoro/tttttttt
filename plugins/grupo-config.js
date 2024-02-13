let handler = async (m, { conn, args, usedPrefix, command }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/grupos.jpg'  
let isClose = { // Switch Case Like :v
'open': 'not_announcement',
'close': 'announcement',
'abierto': 'not_announcement',
'cerrado': 'announcement',
'abrir': 'not_announcement',
'cerrar': 'announcement',
}[(args[0] || '')]
if (isClose === undefined)
throw `
${lenguajeGB'smsAvisoMG'}*╭━[ ${wm} ]━⬣*
*┃➥ ${usedPrefix + command} open*
*┃➥ ${usedPrefix + command} close*
*╰━━━━━[ 💗 ${vs} ]━━━━━⬣*
`.trim()
await conn.groupSettingUpdate(m.chat, isClose)
  
if (isClose === 'not_announcement'){
conn.sendButton(m.chat, `${lenguajeGB'smsAvisoEG'}𝙔𝙊𝙐 𝘾𝘼𝙉 𝙒𝙍𝙄𝙏𝙀 𝙀𝙑𝙀𝙍𝙔𝙊𝙉𝙀 𝙄𝙉 𝙏𝙃𝙄𝙎 𝙂𝙍𝙊𝙐𝙋!!`, `𝙂𝙍𝙊𝙐𝙋 𝙊𝙋𝙀𝙉\n${wm}`, pp, [['𝙊𝙛𝙛𝙞𝙘𝙞𝙖𝙡 𝘼𝙘𝙘𝙤𝙪𝙣𝙩𝙨 | 𝘼𝙘𝙘𝙤𝙪𝙣𝙩𝙨 ✅', `.cuentasgb`], ['𝙂𝙤 𝙗𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', `/menu`]], m)
}
  
if (isClose === 'announcement'){
//m.reply(`${eg}*𝙂𝙍𝙊𝙐𝙋 𝘾𝙇𝙊𝙎𝙀𝘿*\n𝙊𝙉𝙇𝙔 𝘼𝘿𝙈𝙄𝙉𝙎 𝘾𝘼𝙉 𝙒𝙍𝙄𝙏𝙀 𝙄𝙉 𝙏𝙃𝙄𝙎 𝙂𝙍𝙊𝙐𝙋`)
conn.sendButton(m.chat, `${lenguajeGB'smsAvisoEG'}𝙊𝙉𝙇𝙔 𝘼𝘿𝙈𝙄𝙉𝙎 𝘾𝘼𝙉 𝙒𝙍𝙄𝙏𝙀 𝙄𝙉 𝙏𝙃𝙄𝙎 𝙂𝙍𝙊𝙐𝙋!!`, `𝙂𝙍𝙊𝙐𝙋 𝘾𝙇𝙊𝙎𝙀𝘿\n${wm}`, pp, [['𝘼𝙙𝙢𝙞𝙣 𝙈𝙤𝙢𝙚𝙣𝙩 😎', '.s'], ['𝙂𝙤 𝙗𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', `/menu`]], m)
}  
 }
handler.help = ['group open / close', 'group open / close']
handler.tags = ['group']
handler.command = /^(group|gp)$/i
handler.admin = true
handler.botAdmin = true
export default handler
