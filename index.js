require('dotenv').config()

const Client = require('discord.js').Client

const { registerLogger } = require('./lib/logger')

const client = new Client()
registerLogger(client)

client.on('message', message => {
  if (message.content === '!ping') message.channel.send('Pong.')
})

client.login(process.env.TOKEN)
