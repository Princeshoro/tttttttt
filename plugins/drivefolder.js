/* Script Hecha por Edder ミ⁠●⁠﹏⁠☉⁠ミ  */
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `${lenguajeGB['smsAvisoMG']()} Enter a URL of a Drive folder`
    let url=args[0]
    if (!(url && url.match(/drive\.google/i))) throw `${lenguajeGB['smsAvisoMG']()} The url entered is invalid`
    url=url.replace('/mobile', '');
    try{
    let re1=(await getData(url)).join("\n\n")
    m.reply(`Sending file and subfolder links \n\n ${re1}`)
    }catch{
    	throw `An unexpected error occurred or the url is not from a folder`
    }
}

async function getData(folderUrl) {
      let res = await fetch(folderUrl);
      let text = await res.text();
      let archivos = text.match(/https:\/\/drive.google.com\/file\/d\/([^\s\\]+)usp\b/g);
      let folders=text.match(/https:\/\/drive.google.com\/drive\/folders\/([^\s"|\\|&|?|%]+)/g);
      let regex =/(?<=\\x22\\x5d,\\x22)(.*?)(?=\\x22)/g
      let nombres=text.match(regex);
      folders=eliminarDuplicados(folders)
      archivos=eliminarDuplicados(archivos)
      folders.shift();
      let con=folders.concat(archivos);
      let resultado=[]
      let index=0
      while (nombres.length > 0) {
      let elemento = nombres.shift(); 
      resultado.push(`${elemento} ${con[index]}`)
      index ++;
      }
      return resultado
    }

function eliminarDuplicados(lista) {
    return Array.from(new Set(lista));
}

handler.help = ['drivefolder'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(drivefolder|df)$/i
export default handler
