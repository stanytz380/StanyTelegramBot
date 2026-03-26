const { Telegraf } = require('telegraf')
const config = require('./config')
const fs = require('fs')
const path = require('path')
const http = require('http') // we'll use the built-in server

const bot = new Telegraf(config.botToken)

const owner = String(config.ownerId)
const isOwner = (ctx) => String(ctx.from?.id) === owner

bot.context.owner = owner
bot.context.isOwner = isOwner
bot.context.ownerOnlyReply = () => '⛔ this command is owner-only'

bot.use(async (ctx, next) => {
  const text = ctx.message?.text
  if (text && text.startsWith('/')) {
    const username = ctx.from?.username ? '@' + ctx.from.username : '-'
    const id = ctx.from?.id || '-'
    const waktu = new Date().toLocaleTimeString('id-ID', {
      timeZone: 'Africa/Nairobi',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
    console.log('Command Detected')
    console.log('Command:', text)
    console.log('Username:', username)
    console.log('ID:', id)
    console.log('Time:', waktu, 'WIB')
    console.log('----------------------')
  }
  return next()
})

const COMMAND_DIR = path.join(__dirname, 'commands')
const loaded = new Set()

function loadCommand(file) {
  const filePath = path.join(COMMAND_DIR, file)
  delete require.cache[require.resolve(filePath)]
  const plugin = require(filePath)
  if (!plugin?.register || loaded.has(file)) return
  plugin.register(bot)
  loaded.add(file)
  console.log('Loaded:', file)
}

function loadAll() {
  fs.readdirSync(COMMAND_DIR)
    .filter(v => v.endsWith('.js'))
    .forEach(loadCommand)
}

loadAll()

fs.watch(COMMAND_DIR, (_, file) => {
  if (!file || !file.endsWith('.js')) return
  setTimeout(() => {
    if (fs.existsSync(path.join(COMMAND_DIR, file))) {
      loadCommand(file)
    }
  }, 200)
})

// --- Webhook Setup ---
const PORT = process.env.PORT || 8080
const WEBHOOK_PATH = `/webhook/${config.botToken}`
const DOMAIN = process.env.RENDER_EXTERNAL_URL || 'https://stanytelegrambot.onrender.com' // Replace with your Render app name

bot.telegram.setWebhook(`${DOMAIN}${WEBHOOK_PATH}`)
  .then(() => console.log(`✅ Webhook set to ${DOMAIN}${WEBHOOK_PATH}`))
  .catch(err => console.error('Webhook set failed:', err))

bot.startWebhook(WEBHOOK_PATH, null, PORT)
  .then(() => console.log(`🚀 Bot listening on port ${PORT}`))
  .catch(err => console.error('Webhook server failed:', err))

// Optional: Simple HTTP response for root path to show bot is alive
http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Bot is running (webhook mode)\n')
  }
}).listen(PORT, () => console.log(`HTTP server on port ${PORT} (additional)`))