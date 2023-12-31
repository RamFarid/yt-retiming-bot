require('dotenv').config()
const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
  ctx.reply(
    `Welcome ${
      ctx.chat.first_name || 'Bro'
    }!\nSend me a link with retiming command to retiming the YouTube link like this:\n<b>/retiming https://youtu.be/xxxxxxxxxxx <b>to</b> 1m2s</b>\nIn the previous example I will send you a new link that directive you to the first minute and the 2th second\n<b>Read the following: </b>\n• hour = h \n• minute = m \n• second = s`,
    { parse_mode: 'HTML' }
  )
})

bot.command('retiming', async (ctx) => {
  const msg = ctx.message.text.replace('/retiming', '').trim()
  const msgArray = msg.split('to')
  if (msgArray.length === 1)
    return await ctx.reply(
      "Please make sure that the 'to' keyword is lowercase not like this 'To' or 'tO'"
    )
  const link = msgArray[0].trim()
  const time = msgArray[1].trim()
  if (
    !link.includes('youtube.com') &&
    !link.includes('www.youtube.com') &&
    !link.includes('youtu.be')
  )
    return await ctx.reply(
      `The link doesn't correct, try again and consider the followings:\n• Must be from youtu.be domain or youtube.com\n• The ID of the video after the / symbol must be 11 characters`
    )
  if (
    !time.toLowerCase().includes('m') &&
    !time.toLowerCase().includes('s') &&
    !time.toLowerCase().includes('h')
  )
    return await ctx.reply(
      "Dude! the time you want must contains (m s h), consider the following:\n• hour = h \n• minute = m \n• second = s\n if you want the link directive you to the first minute at the 14th second just put like that '1m14s'"
    )

  return await ctx.reply(`${link}?t=${time}`)
})

bot.launch({
  webhook: {
    domain: 'https://yt-retiming-bot.vercel.app',
    port: process.env.PORT,
  },
})
