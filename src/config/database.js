import { Sequelize } from "sequelize"
import config from "./dotenv.js"
import pg from "pg"

const { PROD_DB_URL, DEV_DB_URL, NODE_ENV } = config

const sequelize = new Sequelize(
  NODE_ENV === "production" ? PROD_DB_URL : DEV_DB_URL,
  {
    logging: false,
    dialectModule: pg,
    dialect: "postgres",
    dialectOptions: {
      ssl: NODE_ENV === "production",
    },
  }
)

export default sequelize
