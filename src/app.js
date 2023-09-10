import express from "express"
import cors from "cors"
import router from "./router/router.js"
import logger from "./utils/logger.js"
import sequelize from "./config/database.js"
import Code from "./models/codeModel.js"
import Url from "./models/urlModel.js"
import * as url from "url"

const app = express()

try {
  await sequelize.authenticate()
  //logger.info(`Connected to database: ${sequelize.getDatabaseName()}`)
} catch (err) {
  logger.error(`Unable to connect to the database: ${err}`)
  process.exit(1)
}

try {
  await Url.sync({ alter: true })
  await Code.sync({ alter: true })
} catch (err) {
  logger.error(`Unable to sync database: ${err}`)
  process.exit(1)
}

const corsOptions = {
  origin: "*",
  methods: "GET,POST,PUT,PATCH,DELETE",
  credentials: true,
}

// __dirname is not available by default when using ES modules
const __dirname = url.fileURLToPath(new URL("..", import.meta.url))

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}public`))
app.set("view engine", "ejs")
app.set("views", "./src/views")
app.use(router)

export default app
