let generateWAMessageFromContent = (await import(global.baileys)).default
import * as fs from 'fs';
const handler = async (m, {conn, text, participants, isOwner, isAdmin}) => {
  try 
    
    const q = m.quoted ? m.quoted : m || m.text || m.sender;
    const c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender;
    const msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, {[m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : {text: '' || c}}, {quoted: m, userJid: conn.user.id}), text || q.text, conn.user.jid);
    await conn.relayMessage(m.chat, msg.message, {messageId: msg.key.id});
  } catch {

    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);
    const more = String.fromCharCode(8206);
    const masss = more.repeat(850);
    const htextos = `${text ? text : '*Hey Reply with media to add caption*'}`;
    if ((isMedia && quoted.mtype === 'imageMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(m.chat, {image: mediax, caption: htextos}, {quoted: m});
    } else if ((isMedia && quoted.mtype === 'videoMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(m.chat, {video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos}, {quoted: m});
    } else {
      await conn.relayMessage(m.chat, {extendedTextMessage: {text: `${masss}\n${htextos}\n`, ...{contextInfo: {mentionedJid: users, externalAdReply: {thumbnail: imagen1, sourceUrl: md}}}}}, {});
    }
  }
};
handler.command = /^(caption|cap|cp)$/i
handler.tags = ['tools'];
handler.group = false
handler.admin = false
export default handler
