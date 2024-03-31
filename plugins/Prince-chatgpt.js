
import displayLoadingScreen from '../lib/loading.js'
import fetch from 'node-fetch'
import {delay} from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  try {
    if (!text) throw `uhm.. what do you want to say?`
    m.react('⏳')
    //await displayLoadingScreen(conn, m.chat)


    const prompt = encodeURIComponent(text);
    let apiurl = `https://ultimetron.guruapi.tech/gpt4?prompt=${prompt}`

    const result = await fetch(apiurl);
    const response = await result.json();
    console.log(response)
    const textt = response.result.reply;
    await typewriterEffect(conn,m, m.chat , textt);
       m.react('✅')
  } catch (error) {
    console.error(error);
    m.reply('Oops! Something went wrong. , we are trying had to fix it asap');
  }
}
handler.help = ['gpt4 <text>']
handler.tags = ['tools']
handler.command = /^(gpt4|gds)$/i
