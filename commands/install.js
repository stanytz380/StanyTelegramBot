const { exec } = require('child_process')

module.exports = {
  name: 'install',
  description: 'Install npm package directly from bot',
  register: (bot) => {
    bot.command(['install', 'installm', 'installmodule'], async (ctx) => {
        
       if (!ctx.isOwner(ctx)) return ctx.reply(ctx.ownerOnlyReply())
      
      try {
        const text = ctx.message.text.split(' ').slice(1).join(' ')
        if (!text) return ctx.reply('example: /install axios')

        await ctx.reply('📦 installing package...')

        exec(`npm install ${text}`, { cwd: process.cwd() }, (err, stdout, stderr) => {
          if (err) {
            return ctx.reply(`❌ installation failed\n\n${stderr.slice(0, 3500)}`)
          }

          let output = stdout || stderr
          if (output.length > 3800) output = output.slice(0, 3800)

          ctx.reply(`✅ installation successful\n\n${output}`)
        })

      } catch (e) {
        console.error(e)
        ctx.reply('error while installing package')
      }
    })
  }
}
