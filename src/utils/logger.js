import winston from "winston"
import config from "../config/dotenv.js"

const { NODE_ENV } = config

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
      filename: NODE_ENV === "production" ? "temp/error.log" : "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename:
        NODE_ENV === "production" ? "temp/combined.log" : "logs/combined.log",
    }),
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
