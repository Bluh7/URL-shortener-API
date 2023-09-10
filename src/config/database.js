import { Sequelize } from "sequelize"
import config from "./dotenv.js"

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = config

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
})

export default sequelize
