const handler = async (m, { conn, isOwner, isAdmin, isROwner} ) => {
if (!(isAdmin || isOwner)) return
  m.reply(`${eg}*🟢Tʜᴇ ʙᴏᴛ ʜᴀs ʙᴇᴇɴ ᴀᴄᴛɪᴠᴀᴛᴇᴅ ғᴏʀ ᴛʜɪs ᴄʜᴀᴛ𒁂*`)
global.db.data.chats[m.chat].isBanned = false 
}
handler.help = ['unbanchat'];
handler.tags = ['owner'];
handler.command = /^unbanchat|onmd|boton$/i;
handler.botAdmin = false
handler.admin = true
handler.rowner = true
handler.owner = true
export default handler;
