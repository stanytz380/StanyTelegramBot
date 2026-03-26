module.exports = {
  name: "start",
  description: "Display bot info",
  register: (bot) => {
    bot.command('start', async (ctx) => {
      await ctx.replyWithPhoto(
        { url: 'https://files.catbox.moe/3z9k81.jpg' },
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
                  text: '📢 WhatsApp Channel',
                  url: 'https://whatsapp.com/channel/0029Vb77eyl05MUcCQBHME2f'
                }
              ],
              [
                {
                  text: '👤 Owner',
                  url: 'https://t.me/rvli07'
                }
              ]
            ]
          }
        }
      )
    })
  }
}
