let handler = async (m) => {
global.db.data.chats[m.chat].isBanned = true
m.reply(`${eg}*🔴Tʜᴇ ʙᴏᴛ ʜᴀs ʙᴇᴇɴ ᴅᴇᴀᴄᴛɪᴠᴀᴛᴇᴅ ғᴏʀ ᴛʜɪs ᴄʜᴀᴛ𒁂*`)
}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^banchat|bangata|offmd|banchat2$/i
handler.botAdmin = false
handler.admin = true 
handler.rowner = true
export default handler
