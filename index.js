// 引用 linebot 套件
import linebot from 'linebot'
// 引用 dotenv 套件
import dotenv from 'dotenv'

// 引用 request
import rp from 'request-promise'

// 讀取 .env 檔
dotenv.config()

// 宣告機器人的資訊
const bot = linebot({
  channelID: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

// 當收到訊息時
bot.on('message', async (event) => {
  let msg = ''
  try {
    const data = await rp({ uri: 'https://kktix.com/events.json', json: true })
    if (event.message.type === 'text') { msg = data.entry[0].title }
  } catch (error) {
    msg = '發生錯誤'
  }
  event.reply(msg)
  // if (event.message.type === 'text') {
  //   event.reply(event.message.text)
  // }
  console.log(event)
})

// 在 port 啟動 ，所有 port3000 進來的東西，都會進到 line 機器人裡面
bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
