import { DataTypes } from "sequelize"
import sequelize from "../config/database.js"

const Url = sequelize.define("urls", {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
})

export default Url
