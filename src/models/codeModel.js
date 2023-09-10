import { DataTypes } from "sequelize"
import sequelize from "../config/database.js"
import Url from "./urlModel.js"

const Code = sequelize.define("codes", {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
})

Code.belongsTo(Url, { foreignKey: "urlId" })
Url.hasOne(Code, { foreignKey: "urlId" })

export default Code
