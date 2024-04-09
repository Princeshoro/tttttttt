const gplay = require("google-play-scraper");

const handler = async (m, {conn, usedPrefix: prefix, command, text}) => {
 if (!text) throw `${lenguajeGB['smsAvisoMG']()}*𝙀𝙓𝘼𝙈𝙋𝙇𝙀: 𝙀𝙉𝙏𝙀𝙍 𝘼𝙋𝙆 𝙉𝘼𝙈𝙀.*`;
  let res = await gplay.search({ term: text });
  if (!res.length) throw `${tradutor.texto2}`;
  let opt = {
    contextInfo: 
      externalAdReply: {
        title: res[0].title,
        body: res[0].summary,
        thumbnail: (await conn.getFile(res[0].icon)).data,
        sourceUrl: res[0].url,
      },
    },
  };
  await console.log(res);
  res = res.map(
    (v) =>
      `${tradutor.texto3[0]} ${v.title}
      ${tradutor.texto3[1]} ${v.developer}
      ${tradutor.texto3[2]} ${v.priceText}
      ${tradutor.texto3[3]} ${v.scoreText}
      ${tradutor.texto3[4]}${v.url}`
  ).join`\n\n`;
  m.reply(res, null, opt);
};
handler.help = ['playstore <aplicacion>'];
handler.tags = ['internet'];
handler.command = /^(playstore|pls)$/i;
export default handler;
