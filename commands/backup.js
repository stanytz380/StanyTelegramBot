const fs = require('fs')
const path = require('path')
const archiver = require('archiver')

module.exports = {
  name: "backupsc",
  description: "Backup bot source to ZIP",
  register: (bot) => {
    bot.command(['backupsc', 'bck', 'backup'], async (ctx) => {
      const rootDir = process.cwd()
      const backupName = `backup-${Date.now()}.zip`
      const backupPath = path.join(rootDir, backupName)

      try {
        const output = fs.createWriteStream(backupPath)
        const archive = archiver('zip', { zlib: { level: 9 } })

        archive.pipe(output)

        archive.glob('**/*', {
          cwd: rootDir,
          ignore: [
            'node_modules/**',
            '.npm/**',
            'package-lock.json',
            backupName
          ]
        })

        await archive.finalize()

        output.on('close', async () => {
          await ctx.replyWithDocument(
            { source: backupPath, filename: backupName },
            { caption: 'Bot source backup completed' }
          )
          fs.unlinkSync(backupPath)
        })

      } catch (e) {
        ctx.reply('Failed to create backup')
      }
    })
  }
}
