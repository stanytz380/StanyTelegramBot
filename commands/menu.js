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
        { url: 'https://raw.githubusercontent.com/Official123-12/STANYFREEBOT-/refs/heads/main/6F84E081-C8A6-454B-8D42-8E85100378AB.png' },
        {
          caption: text,
          parse_mode: 'Markdown'
        }
      )
    })
  }
}
