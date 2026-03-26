const os = require('os')
const process = require('process')

function formatBytes(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 B'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i]
}

function formatUptime(sec) {
  sec = Math.floor(sec)
  const d = Math.floor(sec / 86400)
  const h = Math.floor((sec % 86400) / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  return d + 'd ' + h + 'h ' + m + 'm ' + s + 's'
}

module.exports = {
  name: 'ping',
  register: function (bot) {
    bot.command('ping', async function (ctx) {
      const start = Date.now()

      const msg = await ctx.reply('checking server...')

      const latency = Date.now() - start

      const mem = process.memoryUsage()
      const totalMem = os.totalmem()
      const freeMem = os.freemem()

      const cpu = os.cpus()
      const load = os.loadavg()

      const text =
        '📡 BOT STATUS\n\n' +
        'Latency : ' + latency + ' ms\n' +
        'Uptime  : ' + formatUptime(process.uptime()) + '\n\n' +
        '🖥 SERVER\n' +
        'OS      : ' + os.platform() + ' ' + os.arch() + '\n' +
        'CPU     : ' + cpu[0].model + '\n' +
        'Cores   : ' + cpu.length + '\n' +
        'LoadAvg : ' + load.map(v => v.toFixed(2)).join(' | ') + '\n\n' +
        '💾 MEMORY\n' +
        'RAM Tot : ' + formatBytes(totalMem) + '\n' +
        'RAM Free: ' + formatBytes(freeMem) + '\n' +
        'Process : ' + formatBytes(mem.rss) + '\n\n' +
        '⚙ RUNTIME\n' +
        'Node    : ' + process.version + '\n' +
        'PID     : ' + process.pid

      ctx.telegram.editMessageText(
        ctx.chat.id,
        msg.message_id,
        null,
        text
      )
    })
  }
}
