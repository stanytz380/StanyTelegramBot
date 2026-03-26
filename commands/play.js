const axios = require('axios')
const yts = require('yt-search')

module.exports = {
  name: 'play',
  description: 'Play songs from YouTube (Telegram native)',
  register: (bot) => {
    bot.command(['play', 'song', 'lagu'], async (ctx) => {
      try {
        const text = ctx.message.text.split(' ').slice(1).join(' ')
        if (!text) return ctx.reply('example: /play song title')

        await ctx.reply('🔎 searching for song...')

        const search = await yts(text)
        if (!search.videos.length) {
          return ctx.reply('song not found')
        }

        const vid = search.videos[0]

        const apiUrl =
          'https://host.optikl.ink/download/youtube?url=' +
          encodeURIComponent(vid.url) +
          '&format=mp3'

        const { data } = await axios.get(apiUrl)
        if (!data.result || !data.result.download) {
          return ctx.reply('audio not available')
        }

        await ctx.replyWithPhoto(
          { url: vid.thumbnail },
          {
            caption:
              '🎵 ' + data.result.title + '\n' +
              '👤 ' + (vid.author && vid.author.name ? vid.author.name : 'YouTube')
          }
        )

        await ctx.replyWithAudio(
          { url: data.result.download },
          {
            title: data.result.title,
            performer: vid.author && vid.author.name ? vid.author.name : 'YouTube'
          }
        )

      } catch (e) {
        console.error(e)
        ctx.reply('failed to play song')
      }
    })
  }
}
