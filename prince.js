import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"
import cheerio from "cheerio"
import fetch from "node-fetch"
import axios from "axios"
import moment from "moment-timezone"


// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •
// Add the owner numbers if you want.
global.owner = [
["923092668108", 'Prince❤️', true], //ɢᴅs-ᴍᴅ
[""], 
[""], 
]




// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •
// [ES] > Agregate a ti, colaboradores o ayudates, aparecerá en el comando de lista de contactos.
// [EN] > Adding yourself, collaborators or helpers will appear in the contact list command.
global.official = [ // Agregate si eres Owner
["923092668108", 'PRINCEGDS 💻', 1], 
["923092668108", '*_DEVELOPER_* 𝗢𝗳𝗶𝗰𝗶𝗮𝗹 💻', 1],  
["923092668108", '𝗦𝘂𝗽𝗽𝗼𝗿𝘁 𝗢𝗳𝗶𝗰𝗶𝗮𝗹 💻', 1],
["923092668108", '_*DEVELOPER*_ 𝗢𝗳𝗶𝗰𝗶𝗮𝗹 💻', 1],
["923092668108", 'Support', 1]]

global.mail = '' // Add email
global.desc = '' // Add short description (20 caractres max)
global.desc2 = '' // Add long description (90 caractres max) (Este parámetro se aplicará sólo si su whasapp no tiene descripción)
global.country = '' // Add country, example: 🇪🇨
// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •


// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •
// [ES] > CUENTAS E INFORMACIÓN DE VERSIONES DEL BOT, POR FAVOR 
// MANTENGA ESTO SIN MODIFICAR, NOS ESFORZAMOS A DIARIO POR OFRECERLES UN BOT PARA LA COMUNIDAD, SEA AGRADECIDO 😉
// [EN] > ACCOUNTS AND BOT VERSION INFORMATION, PLEASE KEEP THIS UNCHANGED, WE STRIVE DAILY TO PROVIDE YOU WITH A BOT FOR THE COMMUNITY, BE GRATEFUL
global.vs = "1.7.0"
global.vsJB = "2.5 (Beta)"
global.gt = "𝙂𝘿𝙎-𝙈𝘿"
global.menuvid = 'https://i.imgur.com/GFAAXqw.mp4'


global.yt = ""
global.yt2 = ""
global.ig = ""
global.md = "https://github.com/PRINCE-GDS/GDS-MD"
global.fb = ""
global.tk = ""
global.ths = ""
global.paypal = ''
global.asistencia = 'https://wa.me/message/DCAK67ON3XVOG1' //Contacto

global.nna = '' // CANAL UPDATE
global.nn2 = '' // CANAL GataBot
global.nna2 = '' // Help
global.nn = '' // Grupo 1
global.nnn = '' // Grupo 2
global.nnnt = '' // Grupo 3
global.nnntt = '' // Grupo 4
global.nnnttt = '' // Grupo 5
global.nnnttt1 = '' // Grupo 6 COL
global.nnnttt2 = '' // Grupo 7 COL
global.nnnttt3 = '' // Grupo 8 COL
global.nnnttt4 = '' // Grupo 9 COL
global.nnnttt5 = '' // A.T.M.M
// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •

global.rg = '╰⊱✅⊱ *𝙍𝙀𝙎𝙐𝙇𝙏* ⊱✅⊱╮\n\n'
global.resultado = rg

global.ag = '╰⊱⚠️⊱ *𝙒𝘼𝙍𝙉𝙄𝙉𝙂* ⊱⚠️⊱╮\n\n'
global.advertencia = ag

global.iig = '╰⊱❕⊱ *𝙄𝙉𝙁𝙊𝙍𝙈𝘼𝙏𝙄𝙊𝙉* ⊱⊱╮\n\n'
global.informacion = iig

global.fg = '╰⊱❌⊱ *𝙀𝙍𝙍𝙊𝙍* ⊱❌⊱╮\n\n'
global.fallo = fg

global.mg = '╰⊱❗️⊱ *𝙐𝙎𝙀𝘿 𝙄𝙏 𝙒𝙍𝙊𝙉𝙂* ⊱❗️⊱╮\n\n'
global.mal = mg

global.eeg = '╰⊱📩⊱ *𝙍𝙀𝙋𝙊𝙍𝙏* ⊱📩⊱╮\n\n'
global.envio = eeg

global.eg = '╰⊱💚⊱ *𝙎𝙐𝘾𝘾𝙀𝙎𝙎* ⊱💚⊱╮\n\n'
global.exito = eg
global.vidcap = process.env.Video_Cap
// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •
global.wm = "𝙂𝘿𝙎-𝙈𝘿 : ɢᴅs-ᴍᴅ"
global.igfg = "𝙂𝘿𝙎-𝙈𝘿"
global.wait = "*⌛ _Charging..._ ▬▭▭▭▭▭▭*"
global.waitt = "*⌛ _Charging..._ ▬▬▭▭▭*"
global.waittt = "*⌛ _Charging..._ ▬▬▬▬▭▭*"
global.waitttt = "*⌛ _Charging..._ ▬▬▬▬▬▬▭*"
global.nomorown = "923092668108"
global.pdoc = ["application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/msword", "application/pdf", "text/rtf"]
// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •






// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •
// ❰ BOT IMAGE ❱
global.imagen1 = fs.readFileSync("./media/menus/menu.jpg")
global.imagen2 = fs.readFileSync("./media/menus/menu1.jpg")
global.imagen3 = fs.readFileSync("./media/menus/menu2.jpg")
global.imagen4 = fs.readFileSync("./media/menus/Menu3.jpg")
global.imagen5 = fs.readFileSync("./media/menus/img1.jpg")
global.imagen6 = fs.readFileSync("./media/menus/img2.jpg")
global.imagen7 = fs.readFileSync("./media/menus/img3.jpg")
global.imagen8 = fs.readFileSync("./media/menus/img4.jpg")
global.imagen9 = fs.readFileSync("./media/menus/img5.png")
global.imagen10 = fs.readFileSync("./media/menus/img5.jpg")
global.imagen11 = fs.readFileSync("./media/menus/img6.jpg")

global.img = 'https://i.imgur.com/IXlUwTW.jpg'
global.img2 = 'https://i.imgur.com/EXTbyyn.jpg'

global.img3 = 'https://i.imgur.com/oUAGYc2.jpg' //prem
global.img4 = 'https://i.imgur.com/i0pccuo.jpg' //prem

global.img5 = 'https://i.imgur.com/iL1snRx.jpeg'
global.img6 = 'https://i.imgur.com/cYFgSKv.jpeg'
global.img7 = 'https://i.imgur.com/JqL3h2V.jpeg'
global.img8 = 'https://i.imgur.com/PCujt1s.jpeg'
global.img9 = 'https://i.imgur.com/xfUEdDb.jpeg'

global.img10 = 'https://i.imgur.com/DvHoMc3.jpg'
global.img11 = 'https://i.imgur.com/5Q1MqGD.jpg'
global.img12 = 'https://i.imgur.com/vWnsjh8.jpg'
global.img13 = 'https://i.imgur.com/pCfFOgw.jpeg'
global.img14 = 'https://i.imgur.com/knBDWRA.jpeg'
global.img15 = 'https://i.imgur.com/QrkkKx7.jpeg'

global.img16 = 'https://i.imgur.com/11MRjo4.jpeg' //+18

global.img17 = 'https://i.imgur.com/JpYfcH0.jpeg'
global.img18 = 'https://i.imgur.com/9yLH4W4.jpeg'

global.logogit = 'https://tinyurl.com/2qvl9vgs'
// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •

// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •
// ❰ RANDOMS ❱
global.welgata = [tk, ig, yt2, yt2, ig, md, ig, yt, paypal, yt2, yt2, ig, fb, tk, ths, asistencia]
global.redesMenu = [nna, nn, nn2, nnn, nnnt, nnntt, nnnttt, nnnttt1, nnnttt2, nnnttt3, nnnttt4, nnnttt5, md, ig, paypal, yt, asistencia, fb, tk]
global.gataMenu = [img, img2, img6, img7, img8, img9, img13, img14, img15, img17, img18]
global.gataVidMenu = ['./media/menus/Menuvid1.mp4', './media/menus/Menuvid2.mp4', './media/menus/Menuvid3.mp4']
global.gataImg = [imagen1, imagen2, imagen3, imagen4, imagen5, imagen6, imagen7, imagen8, imagen9, imagen10]
// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •

// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •
// ❰ RPG ❱
global.flaaa = [
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text='];

global.cmenut = "❖––––––『"
global.cmenub = "┊✦ "
global.cmenuf = "╰━═┅═━––––––๑\n"
global.cmenua = "\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     "
 
global.dmenut = "*❖─┅──┅〈*"
global.dmenub = "*┊»*"
global.dmenub2 = "*┊*"
global.dmenuf = "*╰┅────────┅✦*"
global.htjava = "⫹⫺"

global.htki = "*⭑•̩̩͙⊱•••• ☪*"
global.htka = "*☪ ••••̩̩͙⊰•⭑*"

global.comienzo = "• • ◕◕════"
global.fin = " • •"

global.botdate = `⫹⫺ Date :  ${moment.tz('Asia/Karachi').format('DD/MM/YY')}`; //Asia/Karachi🇵🇰
global.bottime = `𝗧 𝗜 𝗠 𝗘 : ${moment.tz('Asia/Karachi').format('HH:mm:ss')}`;//Asia/Karachi🇵🇰
global.fgif = {
key: {
participant : '0@s.whatsapp.net'},
message: { 
"videoMessage": { 
"title": wm,
"h": `Hmm`,
'seconds': '999999999', 
'gifPlayback': 'true', 
'caption': bottime,
'jpegThumbnail': fs.readFileSync('./media/menus/Menu3.jpg')
}}}















let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
unwatchFile(file);
console.log(chalk.redBright("Update 'prince.js'"));
import(`${file}?update=${Date.now()}`);
});
