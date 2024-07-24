/**
 * Created By Shyro
 * Buy The Script To Get Full Code
 */

const { tiktok } = require("api-dylux");

let handler = async (m, { conn, text, command }) => {
  if (!text) {
    throw "🚩 Input link tiktok";
  }

  m.react('🕑');

  let result = await tiktok(text);
  let data = result.result;

  let caption = `❖ *Title:* ${data.title}\n`;
  caption += `❖ *Username:* ${data.author.nickname}\n`;
  caption += `❖ *Id:* ${data.id}\n`;
  caption += `❖ *Like:* ${data.digg_count}\n`;
  caption += `❖ *Comments:* ${data.comment_count}\n`;
  caption += `❖ *Duration:* ${data.duration}\n`;

  if (data.images) {
    if (m.isGroup) {
      data.images.forEach(async (image) => {
        await conn.sendMessage(m.sender, {
          image: {
            url: image
          }
        }, {
          quoted: m
        });
      });
      m.reply("Data is an image\nImages will be sent in a private chat!");
    } else {
      data.images.forEach(async (image) => {
        await conn.sendMessage(m.sender, {
          image: {
            url: image
          }
        }, {
          quoted: m
        });
      });
    }
  } else {
    conn.sendMessage(m.chat, {
      video: {
        url: data.play
      },
      caption: caption
    }, {
      quoted: m
    });
  }
};

handler.help = ["tiktok *<url>*"];
handler.command = ["tk3"];
handler.tags = ["downloader"];
handler.limit = false;

module.exports = handler;
