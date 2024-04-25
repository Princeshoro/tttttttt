import fg from 'api-dylux';

function getMimeTypeFromExtension(fileExtension) {
    switch (fileExtension.toLowerCase()) {
        case 'pdf':
            return 'application/pdf';
        case 'mp4':
            return 'video/mp4';
        case 'mkv':
            return 'video/x-matroska';
        case 'zip':
            return 'application/zip';
        default:
            return '';
    }
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `✳️ Enter a Google Drive link to get the file in pdf format`;

    m.react(rwait);

    try {
        let res = await fg.GDriveDl(args[0]);

        const fileExtension = res.fileName.split('.').pop();
        const fileType = getMimeTypeFromExtension(fileExtension);

        await m.reply(`
𓅓𝗚𝗢𝗢𝗚𝗟𝗘 𝗗𝗥𝗜𝗩𝗘 𝗣𝗗𝗙 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥𓅓
💗 *Number:* ${res.fileName}
💗 *Size:* ${res.fileSize}
💗 *Type:* ${fileType}`);

        conn.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: fileType }, { quoted: m });
        m.react(done);
    } catch {
        m.reply('Error: Check the link or try another link');
    }
};

handler.help = ['gdpdf'];
handler.tags = ['downloader'];
handler.command = ['gdpdf', 'gdrivepdf'];
handler.credit = false;
handler.premium = false;

export default handler;
