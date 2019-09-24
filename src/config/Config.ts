import { Injectable } from "@tsed/di"
import config, { nodeEnv, NodeEnv, runtimeProfile, RuntimeProfile } from "./index"

@Injectable()
export class Config {
  readonly nodeEnv: NodeEnv = nodeEnv
  readonly isProduction = this.nodeEnv === NodeEnv.Production
  readonly isDevelopment = this.nodeEnv === NodeEnv.Development
  readonly runtimeProfile: RuntimeProfile = runtimeProfile

  readonly port: number = config.port
  readonly secret: string = config.secret
  readonly sequelize = config.sequelize
}
