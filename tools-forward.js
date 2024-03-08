let generateWAMessageFromContent = (await import(global.baileys)).default
import * as fs from 'fs';

const handler = async (m, { conn, text, isOwner, isAdmin }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const c = m.quoted ? await m.getQuotedObj() : m;
    const msg = conn.cMod(m.chat, {
      [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted
        ? c.message[q.mtype]
        : { text: '' || c },
    }, { quoted: m, userJid: conn.user.id });
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
  } catch {
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);
    const more = String.fromCharCode(8206);
    const masss = more.repeat(850);
    const htextos = `${text ? text : '*Here you go*'}`;
    if ((isMedia && quoted.mtype === 'imageMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(conn.user.id, { image: mediax, caption: htextos }, { quoted: m });
      m.react('✅')
    } else if ((isMedia && quoted.mtype === 'videoMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(conn.user.id, { video: mediax, mimetype: 'video/mp4', caption: htextos }, { quoted: m });
      m.react('✅')
    } else {
      await conn.relayMessage(m.chat, { extendedTextMessage: { text: `${masss}\n${htextos}\n`, ...{ contextInfo: { externalAdReply: { thumbnail: imagen1, sourceUrl: md } } } } }, {});
    }
  }
};
handler.command = /^(forward|save)$/i;
handler.tags = ['tools'];
handler.group = false;
handler.admin = false;
export default handler;
