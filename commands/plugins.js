const fs = require('fs')
const path = require('path')

const COMMAND_DIR = __dirname

module.exports = {
  name: 'plugin-manager',
  register: (bot) => {

    bot.command(['addp', 'addplugin', 'sp'], async (ctx) => {
      if (!ctx.isOwner(ctx)) return ctx.reply(ctx.ownerOnlyReply())

      const filename = ctx.message.text.split(' ')[1]
      if (!filename) return ctx.reply('example: /addp play.js')

      const code = ctx.message.reply_to_message?.text
      if (!code) return ctx.reply('reply to a message containing the code')

      if (!filename.endsWith('.js')) return ctx.reply('file must be .js')

      const filePath = path.join(COMMAND_DIR, filename)
      if (fs.existsSync(filePath)) return ctx.reply('plugin already exists')

      fs.writeFileSync(filePath, code)

      ctx.reply(`✅ plugin added\n${filename}`)
    })

    bot.command(['listp', 'listplugin'], async (ctx) => {
      if (!ctx.isOwner(ctx)) return ctx.reply(ctx.ownerOnlyReply())

      const files = fs.readdirSync(COMMAND_DIR).filter(v => v.endsWith('.js'))
      if (!files.length) return ctx.reply('no plugins found')

      ctx.reply(
        '📦 plugin list:\n\n' +
        files.map(v => `- ${v}`).join('\n')
      )
    })

    bot.command(['delp', 'delplugin', 'dp'], async (ctx) => {
      if (!ctx.isOwner(ctx)) return ctx.reply(ctx.ownerOnlyReply())

      const filename = ctx.message.text.split(' ')[1]
      if (!filename) return ctx.reply('example: /delp play.js')

      const filePath = path.join(COMMAND_DIR, filename)
      if (!fs.existsSync(filePath)) return ctx.reply('plugin not found')

      fs.unlinkSync(filePath)

      ctx.reply(`🗑️ plugin deleted\n${filename}`)
    })

  }
}
