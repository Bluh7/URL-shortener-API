import dotenv from "dotenv"
dotenv.config()

export default {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS || "",
  DB_NAME: process.env.DB_NAME || "url_shortener",
  API_URL: process.env.API_URL || "http://localhost:3000",
}
