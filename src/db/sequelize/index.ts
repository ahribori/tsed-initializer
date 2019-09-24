import { Sequelize } from "sequelize-typescript"
import * as path from "path"
import config from "../../config"

const db = new Sequelize({
  username: config.sequelize.username,
  password: config.sequelize.password,
  modelPaths: [path.resolve(__dirname, "../../model")],
  dialect: config.sequelize.dialect as "mysql",
  host: config.sequelize.host,
  port: config.sequelize.port,
  database: config.sequelize.database,
})

export default db
