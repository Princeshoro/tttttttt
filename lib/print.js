import {WAMessageStubType} from '@whiskeysockets/baileys';
import PhoneNumber from 'awesome-phonenumber'
import chalk from 'chalk'
import { watchFile } from 'fs'

const terminalImage = global.opts['img'] ? require('terminal-image') : ''
const urlRegex = (await import('url-regex-safe')).default({ strict: false })
export default async function (m, conn = { user: {} }) {
let name_user
let _name = await conn.getName(m.sender)
let sender = PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international') + (_name == PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international') ? '' : ' ~' + _name)
let chat = await conn.getName(m.chat)
let img
try {
if (global.opts['img'])
img = /sticker|image/gi.test(m.mtype) ? await terminalImage.buffer(await m.download()) : false
} catch (e) {
console.error(e)
}
let filesize = (m.msg ?
m.msg.vcard ?
m.msg.vcard.length :
m.msg.fileLength ?
m.msg.fileLength.low || m.msg.fileLength :
m.msg.axolotlSenderKeyDistributionMessage ?
m.msg.axolotlSenderKeyDistributionMessage.length :
m.text ?
m.text.length :
0
: m.text ? m.text.length : 0) || 0
let user = global.db.data.users[m.sender]
let me = PhoneNumber('+' + (conn.user?.jid).replace('@s.whatsapp.net', '')).getNumber('international')

name_user = m.messageStubParameters.map(jid => {
let usuario_info = conn.decodeJid(jid)
let name_info = conn.getName(jid)
return chalk.bold(`${name_info ? name_info : 'Someone'} [${PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')}]`)
}).join(', ')

console.log(`
╭━━━━━━━━━━━━━━𖡼
┃ ❖ ${chalk.white.bold('Bot:')} ${chalk.cyan.bold('%s')} 
┃ ❖ ${chalk.white.bold('Timetable:')} ${chalk.black.bgGreen('%s')}
┃ ❖ ${chalk.white.bold('Action:')} ${await formatMessageStubType(m.messageStubType, name_user)}
┃ ❖ ${chalk.white.bold('User:')} ${chalk.white('%s')} / ${chalk.bgMagentaBright.bold(user.role.replace(/\*/g, ''))} / Premium » ${user?.premiumTime > 0 ? '✅' : '❌'}
┃ ❖ ${chalk.white.bold('Resources:')} ${chalk.yellow('%s%s')}
┃ ❖ %s
┃ ❖ ${chalk.white.bold('Message Weight:')} ${chalk.red('%s (%s %sB)')}
┃ ❖ ${chalk.white.bold('Message Type:')} ${chalk.bgBlueBright.bold('[%s]')}
╰━━━━━━━━━━━━━━𖡼`.trim(),

//╭──» ${vs} 𓅓 «───✦ 
//┊ ${chalk.cyan.bold('%s')} ${chalk.black(chalk.cyan('%s'))}ㅤ${chalk.black(chalk.cyan('%s'))} ${chalk.magenta('%s [%s %sB]')}
//┊ ${chalk.white('%s')} ${chalk.yellow('%s%s')} ${chalk.magenta('%s')} ${chalk.black(chalk.red('%s'))}
//╰────────────✦`.trim(),            
me + (conn.user.name == undefined ? '' : ' ~' + conn.user.name) + `${conn.user.jid == global.conn.user.jid ? '' : ' 【𝙂𝘿 - 𝗦𝗨𝗕 𝗕𝗢𝗧】'}`,
(m.messageTimestamp ? new Date(1000 * (m.messageTimestamp.low || m.messageTimestamp)) : new Date).toTimeString(),
sender,
m ? '' : '',
`🆙 ${user.level} / ❇️ ${user.exp} / 💎 ${user.limit} / ✨ ${user.money}`,
(m.chat.includes("@g.us") ? `${chalk.white.bold('Group:')} ${chalk.magentaBright(`${m.chat} ~${chat}`)}` : `${chalk.white.bold('Private:')} ${chalk.greenBright(`${m.sender} ~${user.name ? user.name : conn.getName(m.sender)}`)} `),
filesize,
filesize === 0 ? 0 : (filesize / 1009 ** Math.floor(Math.log(filesize) / Math.log(1000))).toFixed(1),
['', ...'KMGTP'][Math.floor(Math.log(filesize) / Math.log(1000))] || '',
await formatMessageTypes(m.mtype) //m.mtype ? m.mtype : 'Specified node'  //? m.mtype.replace(/message$/i, '').replace('audio', m.msg.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) : ''
)
if (img) console.log(img.trimEnd())
if (typeof m.text === 'string' && m.text) {
let log = m.text.replace(/\u200e+/g, '')
let mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~`])(?!`)(.+?)\1|```((?:.|[\n\r])+?)```|`([^`]+?)`)(?=\S?(?:[\s\n]|$))/g
let mdFormat = (depth = 4) => (_, type, text, monospace) => {
let types = {
'_': 'italic',
'*': 'bold',
'~': 'strikethrough',
'`': 'bgGray'
}
text = text || monospace
let formatted = !types[type] || depth < 1 ? text : chalk[types[type]](text.replace(/`/g, '').replace(mdRegex, mdFormat(depth - 1)))
return formatted
}               
log = log.replace(mdRegex, mdFormat(4))
log = log.split('\n').map(line => {
if (line.trim().startsWith('>')) {
return chalk.bgGray.dim(line.replace(/^>/, '┃'))
} else if (/^([1-9]|[1-9][0-9])\./.test(line.trim())) {
return line.replace(/^(\d+)\./, (match, number) => {
const padding = number.length === 1 ? '  ' : ' '
return padding + number + '.'
})
} else if (/^[-*]\s/.test(line.trim())) {
return line.replace(/^[*-]/, '  •')
}
return line
}).join('\n')
if (log.length < 1024)
log = log.replace(urlRegex, (url, i, text) => {
let end = url.length + i
return i === 0 || end === text.length || (/^\s$/.test(text[end]) && /^\s$/.test(text[i - 1])) ? chalk.blueBright(url) : url
})
log = log.replace(mdRegex, mdFormat(4))
if (m.mentionedJid) for (let user of m.mentionedJid) log = log.replace('@' + user.split`@`[0], chalk.blueBright('@' +await conn.getName(user)))
console.log(m.error != null ? chalk.red(log) : m.isCommand ? chalk.yellow(log) : log == undefined ? '💬 Message Not Found' : log)
}
if (m.messageStubParameters) console.log(m.messageStubParameters.map(jid => {
jid = conn.decodeJid(jid)
let name = conn.getName(jid)
return chalk.gray(PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international') + (name ? ' ~' + name : '')) || '💬 Message Not Found'
}).join(', '))
if (/document/i.test(m.mtype)) console.log(`🗂️ ${m.msg.fileName || m.msg.displayName || 'Document'}`)
else if (/ContactsArray/i.test(m.mtype)) console.log(`👨‍👩‍👧‍👦 ${' ' || ''}`)
else if (/contact/i.test(m.mtype)) console.log(`👨 ${m.msg.displayName || ''}`)
else if (/audio/i.test(m.mtype)) {
const duration = m.msg.seconds
console.log(`${m.msg.ptt ? '🎤ㅤ(PTT ' : '🎵ㅤ('}AUDIO) ${Math.floor(duration / 60).toString().padStart(2, 0)}:${(duration % 60).toString().padStart(2, 0)}`)
}
console.log()
}
let file = global.__filename(import.meta.url)
watchFile(file, () => {
console.log(chalk.redBright("Update 'lib/print.js'"))})

async function formatMessageStubType(messageStubType, name_user) {
switch (messageStubType) {
case 0:
return 'Unknown'
case 1:
return 'Revoked'
case 2:
return 'Ciphertext'
case 20:
return 'A group has been created'
case 21:
return 'Modified Group Name'
case 22:
return 'Changed the group's image'
case 23:
return 'New Group Link'
case 24:
return 'New group description'
case 25:
return 'Group Restrictions Changed'
case 26:
return 'Configured who can send messages in the group'
case 27:
return `${name_user} has joined the group`
case 28:
return `${name_user} You have been removed from the group`
case 29:
return `${name_user} It's a new admin. of the group`
case 30:
return `${name_user} He was no longer an admin. of the group`
case 31:
return `The following have been invited  ${name_user} to the group`
case 32:
return `${name_user} has left the group`
case 145:
return `"Approve new members" was set up in the group`
case 171:
return `Set up "add other members" in the group`
default:
return messageStubType //'Ninguna'
}}

async function formatMessageTypes(messageStubType, mid) {
switch (messageStubType) {
case 'conversation':
return 'Conversación'
case 'imageMessage':
return 'Imagen'
case 'contactMessage':
return 'Contacto'
case 'locationMessage':
return 'Ubicación'
case 'extendedTextMessage':
return 'Texto'
case 'documentMessage':
return 'Documento'
case 'audioMessage':
return 'Audio'
case 'videoMessage':
return 'Video'
case 'call':
return 'Llamada'
case 'chat':
return 'Chat'
case 'protocolMessage':
return 'Cifrado'
case 'contactsArrayMessage':
return 'Lista de contactos'
case 'highlyStructuredMessage':
return 'Estructurado'
case 'fastRatchetKeySenderKeyDistributionMessage':
return 'Distribución de claves'
case 'sendPaymentMessage':
return 'Mensaje de pago'
case 'liveLocationMessage':
return 'Ubicación en vivo'
case 'requestPaymentMessage':
return 'Solicitar pago'
case 'declinePaymentRequestMessage':
return 'Rechazar solicitud de pago'
case 'cancelPaymentRequestMessage':
return 'Cancelar solicitud de pago'
case 'templateMessage':
return 'Mensaje de plantilla'
case 'stickerMessage':
return 'Sticker'
case 'groupInviteMessage':
return 'Invitación a grupo'
case 'templateButtonReplyMessage':
return 'Respuesta de botón de plantilla'
case 'productMessage':
return 'Producto'
case 'deviceSentMessage':
return 'Mensaje enviado por dispositivo'
case 'messageContextInfo':
return 'Contexto del mensaje'
case 'listMessage':
return 'Lista'
case 'viewOnceMessage':
return 'Mensaje de una sola vez'
case 'orderMessage':
return 'Pedido'
case 'listResponseMessage':
return 'Respuesta de lista'
case 'ephemeralMessage':
return 'Efímero'
case 'invoiceMessage':
return 'Factura'
case 'buttonsMessage':
return 'Botones'
case 'buttonsResponseMessage':
return 'Respuesta de botones'
case 'paymentInviteMessage':
return 'Invitación de pago'
case 'interactiveMessage':
return 'Interactivo'
case 'reactionMessage':
return 'Reacción';
case 'stickerSyncRmrMessage':
return 'Sincronización de sticker'
case 'interactiveResponseMessage':
return 'Respuesta interactiva'
case 'pollCreationMessage':
return 'Creación de encuesta'
case 'pollUpdateMessage':
return 'Actualización de encuesta'
case 'keepInChatMessage':
return 'Mensaje de mantener en chat'
case 'documentWithCaptionMessage':
return 'Documento con leyenda'
case 'requestPhoneNumberMessage':
return 'Solicitud de número de teléfono'
case 'viewOnceMessageV2':
return 'Mensaje de una sola vez v2'
case 'encReactionMessage':
return 'Reacción encriptada'
case 'editedMessage':
return 'Mensaje editado'
case 'viewOnceMessageV2Extension':
return 'Extensión de mensaje de una vista v2'
case 'pollCreationMessageV2':
return 'Creación de encuesta v2';
case 'scheduledCallCreationMessage':
return 'Llamada programada'
case 'groupMentionedMessage':
return 'Mención en grupo'
case 'pinInChatMessage':
return 'Mensaje fijado en chat'
case 'pollCreationMessageV3':
return 'Creación de encuesta v3'
case 'scheduledCallEditMessage':
return 'Edición de llamada programada'
case 'ptvMessage':
return 'Mensaje de PTV'
case 'botInvokeMessage':
return 'Invocación de bot'
case 'callLogMesssage':
return 'Registro de llamada'
case 'messageHistoryBundle':
return 'Paquete de historial de mensajes'
case 'encCommentMessage':
return 'Comentario encriptado'
case 'bcallMessage':
return 'Mensaje de llamada B'
case 'lottieStickerMessage':
return 'Mensaje de sticker Lottie'
case 'eventMessage':
return 'Evento'
case 'commentMessage':
return 'Comentario'
case 'newsletterAdminInviteMessage':
return 'Mensaje de invitación de administrador'
case 'extendedTextMessageWithParentKey':
return 'Mensaje de texto con clave principal'
case 'placeholderMessage':
return 'Marcador de posición'
case 'encEventUpdateMessage':
return 'Actualización de evento encriptado'
default:
return mid.idioma_code === 'es' ? messageStubType || 'No especificado' : await formaTxt(messageStubType) || 'Not specified'
}}

async function formaTxt(messageType) {
let formattedMessage = messageType.charAt(0).toUpperCase() + messageType.slice(1);
formattedMessage = formattedMessage.replace(/([A-Z])/g, ' $1').trim();
return formattedMessage
}
