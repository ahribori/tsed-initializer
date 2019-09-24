import { GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings } from "@tsed/common"
import db from "./db/sequelize"
import "@tsed/socketio"
import "@tsed/swagger"

const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")

const rootDir = __dirname

@ServerSettings({
  rootDir,
  acceptMimes: ["application/json"],
  mount: {
    "/api/v1/": path.join(rootDir, "/controller/v1/**/*.ts")
  },
  swagger: [
    {
      path: "/api-docs",
      specPath: path.resolve("swagger.base.json")
    }
  ],
  componentsScan: [],
  logger: {
    requestFields: ["method"],
    logRequest: false,
    disableRoutesSummary: false
  }
})
export class Server extends ServerLoader {
  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */
  public $beforeRoutesInit(): void | Promise<any> {
    this.use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(express.json())
      .use(
        express.urlencoded({
          extended: true
        })
      )
      .use(express.static("public"))
  }

  async $beforeInit(): Promise<any> {
    // DB, ES 초기화
    const forceInitialize = false
    if (forceInitialize) {
      try {
        await db.sync({ force: true })
      } catch (e) {}
    }
    return db.authenticate()
  }
}
