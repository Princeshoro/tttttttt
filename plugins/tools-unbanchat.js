const handler = async (m) => {
m.reply(`${eg}\n*🟢Tʜᴇ ʙᴏᴛ ʜᴀs ʙᴇᴇɴ ᴀᴄᴛɪᴠᴀᴛᴇᴅ ғᴏʀ ᴛʜɪs ᴄʜᴀᴛ𒁂*`)
global.db.data.chats[m.chat].isBanned = false 
}
handler.help = ['unbanchat'];
handler.tags = ['owner'];
handler.command = /^unbanchat|onmd|boton$/i;
handler.botAdmin = false
handler.admin = true
handler.owner = true
export default handler;
