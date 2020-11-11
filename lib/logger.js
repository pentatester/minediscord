const { createLogger, transports, format } = require('winston')

const path = require('path')

const logFormat = format.printf(info => {
  return `${info.timestamp} [${info.level}]: ${info.message}`
})

const logger = createLogger({
  level: process.env.LOG || 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    logFormat
  ),
  transports: [
    new transports.File({
      maxsize: 500000,
      filename: 'logs/error.log',
      level: 'error'
    }),
    new transports.File({
      maxsize: 500000,
      filename: 'logs/combined.log'
    }),
    new transports.Console()
  ]
})

const registerLogger = client => {
  client.on('ready', () => logger.log('info', 'The bot is online!'))
  client.on('debug', m => logger.log('debug', m))
  client.on('warn', m => logger.log('warn', m))
  client.on('error', m => logger.log('error', m))

  process.on('uncaughtException', error => logger.log('error', error))
}

module.exports = { logger, registerLogger }
