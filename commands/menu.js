module.exports = {
  name: "menu",
  description: "Display bot menu",
  register: (bot) => {
    bot.command(['menu', 'help'], async (ctx) => {
      const user = ctx.from

      const username = user.username ? `@${user.username}` : '-'
      const userId = user.id

      const text = `
🤖 *StanyTz - Bot*

Multifunction Telegram bot for automation, tools, and utilities.
Using a dynamic plugin system.

*👤 User Information*
Username : ${username}
ID       : ${userId}

*📋 Main Menu*
• /menu
• /ping
• /play <title>
• /ping
• /installmodule
• /backup
• /addplugin
• /delplugin
• /listplugin

_Use commands as needed. Contact the owner if necessary._
`.trim()

      await ctx.replyWithPhoto(
        { url: 'https://files.catbox.moe/3z9k81.jpg' },
        {
          caption: text,
          parse_mode: 'Markdown'
        }
      )
    })
  }
}
