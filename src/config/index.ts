import * as fs from "fs"
import * as path from "path"
import * as yaml from "js-yaml"

export interface IConfiguration {
  port: number
  secret: string
  sequelize: {
    dialect: "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql" | "mariadb"
    host: string
    port: number
    username: string
    password: string
    database: string
  }
}

export enum NodeEnv {
  Development = "development",
  Production = "production"
}

export enum RuntimeProfile {
  Default = "default",
  Test = "test",
  Override = "override",
  Alpha = "alpha",
  Sandbox = "sandbox",
  Beta = "beta",
  Production = "production"
}

export type Profile = RuntimeProfile

const overrideConfigExist: boolean = fs.existsSync(path.resolve("config/config.override.yaml"))

export const nodeEnv: NodeEnv = (process.env.NODE_ENV as NodeEnv) || NodeEnv.Development
export let runtimeProfile: Profile = (process.env.runtimeProfile as Profile) || RuntimeProfile.Default

if (overrideConfigExist) {
  runtimeProfile = RuntimeProfile.Override
}

export let config: IConfiguration

try {
  console.log(`Runtime profile: ${runtimeProfile}`)
  config = yaml.safeLoad(
    fs.readFileSync(path.resolve(`config/config.${runtimeProfile}.yaml`), "utf-8")
  ) as IConfiguration
} catch (e) {
  throw e
}

export default config
