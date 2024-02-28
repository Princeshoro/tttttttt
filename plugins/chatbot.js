// by https://github.com/elrebelde21
 
let handler = m => m
handler.all = async function (m) {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let chat = global.db.data.chats[m.chat]
let name = conn.getName(m.sender)
if (chat.isBanned) return

if (/^e$/i.test(m.text) ) { //sin prefijo 
let teks = `${pickRandom([`Que bueno sabe la letra E`, `eeeeee`])}`.trim()
conn.reply(m.chat, teks, m, { mentions: { mentionedJid: [m.sender] }})}

/*if (/^Mande porno|porno|paja$/i.test(m.text) ) { //sin prefijo 
let teks = `${pickRandom([`no puedo esta contra las política del grupo.😸`, `_uff miren un pajero_`, `_pagame y paso mi pack😏🥵_`, `_que_`, `_que quiere pija dice 🤣_`, `_pasa el pack de tu hermana😏_`, `_mire un gilipolla_`, `_siuuu sexo sexo sexo😈_`, '_callate putito_'])}`.trim()
conn.reply(m.chat, teks, m, { mentions: { mentionedJid: [m.sender] }})}*/

if (/^reglas|normas|Reglas$/i.test(m.text) ) { //sin prefijo 
conn.reply(m.chat, `*╭┅〘 ⚠️ 𝐎𝐛𝐞𝐲 𝐭𝐡𝐞 𝐫𝐮𝐥𝐞𝐬 ⚠️ 〙*
➽❌ 𝐂𝐚𝐥𝐥𝐢𝐧𝐠 𝐭𝐡𝐞 𝐁𝐨𝐭 𝐢𝐬 𝐩𝐫𝐨𝐡𝐢𝐛𝐢𝐭𝐞𝐝
➽❌ 𝐒𝐩𝐚𝐦𝐦𝐢𝐧𝐠 𝐭𝐡𝐞 𝐁𝐨𝐭 𝐢𝐬 𝐩𝐫𝐨𝐡𝐢𝐛𝐢𝐭𝐞𝐝
➽❌ 𝐃𝐨 𝐧𝐨𝐭 𝐚𝐝𝐝 𝐭𝐨 𝐭𝐡𝐞 𝐁𝐨𝐭
➽❌ 𝐑𝐞𝐬𝐩𝐞𝐜𝐭 𝐭𝐡𝐞 𝐭𝐞𝐫𝐦𝐬 𝐚𝐧𝐝 𝐜𝐨𝐧𝐝𝐢𝐭𝐢𝐨𝐧𝐬
*╰═┅ৡৢ͜͡✦═╡ 𝙂𝘿𝙎-𝙈𝘿 ╞═┅ৡৢ͜͡✦═╯`, fkontak, m)}

if (/^Quiero un bot|como obtengo un bot?|Quiero un bot?|quiero un bot|solicitud|solicitó bot|solicito bot|Necesito un bot|necesito un bot$/i.test(m.text) ) {
conn.reply(m.chat,  `\`⚡Do you want a bot for your group?\`

• https://chat.whatsapp.com/Jo5bmHMAlZpEIp75mKbwxP
• ${ig}
• 

\' ⚡ Will the bot be active 24/7?\'
_*Yes, our bot is hosted on a paid server to keep it up and running 24/7 (that's why we also ask for donations to keep it running)💞*_

> *ɢᴅs-ᴍᴅ ${gt} 💞*`, fkontak, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: `Hola ${name} 👋`, body: wm, previewType: 0, thumbnail: gataImg.getRandom(), sourceUrl: accountsgb.getRandom()}}})}
 
if (/^¿Qué es un Bot?|¿Qué es Bot?|Qué es Bot|qué es Bot|QUÉ ES UN BOT|¿QUÉ ES UN BOT?|¿qué es un Bot?|qué es un Bot|que es un Bot|Qué es un Bot?|Que es un Bot? $/i.test(m.text) ) {
conn.reply(m.chat, `\`✨ What is a WhatsApp BOT?✨\`

🍃 _Un Bot es una inteligencia programada que permite realizar actividades dependiendo de lo que solicite. En temas de WhatsApp, es posible crear stickers, descargar música, vídeos, crear logos, buscar imágenes, interactuar en modo de conversación,  participar en juegos dentro de chats etc..._

🍃 *_Para ver el menú de comandos puedes usar:_*
#menu

𝙂𝘿𝙎-𝙈𝘿`, m)}  
return !0 
}
export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}
