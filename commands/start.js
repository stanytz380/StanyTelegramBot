module.exports = {
  name: "start",
  description: "Display bot info",
  register: (bot) => {
    bot.command('start', async (ctx) => {
      await ctx.replyWithPhoto(
        { url: 'https://raw.githubusercontent.com/Official123-12/STANYFREEBOT-/refs/heads/main/6F84E081-C8A6-454B-8D42-8E85100378AB.png' },
        {
          caption:
            '🤖 Stany - Bot\n\n' +
            'Multifunction Telegram bot for automation and utilities.\n' +
            'Using a plugin system.\n\n' +
            'Use /menu to see features.',
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '📢 Website Link For More Bots',
                  url: 'stanytz.zone.id'
                }
              ],
              [
                {
                  text: '👤 Owner',
                  url: 'https://t.me/Stanytz076'
                }
              ]
            ]
          }
        }
      )
    })
  }
}
