const { MessageType } = require("@whiskeysockets/baileys");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const fs = require("fs");
const os = require("os");
const { streamPipeline } = require("stream/promises");

async function plplay(m) {
    const url = m.text.slice(6).trim();
    const result = await searchAndDownloadMusic(url);

    if (typeof result === "string") {
        m.reply(result);
    } else {
        let msg = "Here are the search results for the playlist:\n\n";
        result.allLinks.forEach((link, i) => {
            msg += `${i + 1}. ${link.title}\n`;
        });
        m.reply(msg);

        const choice = m.text.trim();
        const inputNumber = Number(choice);
        if (inputNumber >= 1 && inputNumber <= result.allLinks.length) {
            const selectedUrl = result.allLinks[inputNumber - 1].url;
            console.log("selectedUrl", selectedUrl);
            let title = generateRandomName();
            const audioStream = ytdl(selectedUrl, {
                filter: "audioonly",
                quality: "highestaudio",
            });

            const tmpDir = os.tmpdir();

            const writableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`);

            await streamPipeline(audioStream, writableStream);

            const doc = {
                audio: {
                    url: `${tmpDir}/${title}.mp3`,
                },
                mimetype: "audio/mpeg",
                ptt: false,
                waveform: [100, 0, 0, 0, 0, 0, 100],
                fileName: `${title}`,
            };

            await conn.sendMessage(m.chat, doc, { quoted: m });
        } else {
            m.reply("Invalid sequence number. Please select the appropriate number from the list above.\nBetween 1 to " + result.allLinks.length);
        }
    }
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

async function searchAndDownloadMusic(query) {
    try {
        const { videos } = await yts(query);
        const allLinks = videos.map((video) => {
            return {
                title: video.title,
                url: video.url,
            };
        });
        return {
            title: videos[0].title,
            description: videos[0].description,
            duration: videos[0].duration,
            author: videos[0].author,
            allLinks,
        };
    } catch (error) {
        return "Error: Invalid playlist URL. Please try again.";
    }
}

handler.command = ['plplay'];
