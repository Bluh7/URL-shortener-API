import app from "./app.js"
import config from "./config/dotenv.js"
import logger from "./utils/logger.js"
import sequelize from "./config/database.js"

const { PORT, NODE_ENV } = config

// appServer is a reference to http.server that app.listen returns
const appServer = app
  .listen(PORT, err => {
    if (err) logger.error(err)

    const currentPort = appServer.address().port

    logger.info(`Ready on http://localhost:${currentPort}`)
  })
  .on("error", err => {
    // if it's a port already in use error, try with the next port
    if (err.code === "EADDRINUSE") {
      const portBeingUsed = err.port
      const newPort = portBeingUsed + 1

      logger.warn(`Port ${portBeingUsed} is busy, trying with port ${newPort}`)

      appServer.listen(newPort)
    } else {
      logger.error(err)
    }
  })

if (NODE_ENV !== "production") {
  // SIGINT is the signal sent to the process when you press CTRL+C
  // SIGTERM is a generic signal used to cause program termination
  process.on("SIGINT" || "SIGTERM", async signal => {
    logger.info(`${signal} signal received: Stopping dev server...`)
    logger.info("Closing database connection...")

    try {
      await sequelize.close()
      logger.info("Database connection closed.")
    } catch (err) {
      logger.error(`Unable to close database connection: ${err}`)
    }

    appServer.close(() => {
      logger.info("Dev server stopped.")
      process.exit(0)
    })
  })
}
