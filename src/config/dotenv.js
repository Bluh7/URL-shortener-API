import dotenv from "dotenv"
dotenv.config()

export default {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  API_URL: process.env.API_URL || "http://localhost:3000",
  PROD_DB_URL: process.env.PROD_DB_URL || "",
  DEV_DB_URL:
    process.env.DEV_DB_URL ||
    "postgres://postgres:postgres@localhost:5432/url_shortener",
}
