import winston from "winston"
import config from "../config/dotenv.js"
import fs from "fs"
import * as url from "url"

const { NODE_ENV } = config

const __dirname = url.fileURLToPath(new URL("../..", import.meta.url))

// create folder and files if they don't exist in production
if (NODE_ENV === "production") {
  const logsDir = `${__dirname}logs`
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir)
  }
  const errorLog = `${__dirname}logs/error.log`
  if (!fs.existsSync(errorLog)) {
    fs.writeFileSync(errorLog, "")
  }
  const combinedLog = `${__dirname}logs/combined.log`
  if (!fs.existsSync(combinedLog)) {
    fs.writeFileSync(combinedLog, "")
  }
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.json()
  ),
  defaultMeta: { service: "url-shortener" },
  transports: [
    // Error level logs or less are written to error.log
    // Info level logs or less are written to combined.log
    new winston.transports.File({
      filename: `${__dirname}logs/error.log`,
      level: "error",
    }),
    new winston.transports.File({ filename: `${__dirname}logs/combined.log` }),
  ],
})

// If we're not in production then log to the `console` with the format:
// timestamp | level: message
if (NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: "HH:mm:ss" }),
        winston.format.colorize({ all: true }),
        winston.format.printf(
          info => `${info.timestamp} | ${info.level}: ${info.message}`
        )
      ),
    })
  )
}

export default logger
