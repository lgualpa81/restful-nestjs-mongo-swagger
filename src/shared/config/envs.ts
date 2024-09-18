import 'dotenv/config'
import * as joi from 'joi'

interface IEnvConfig {
  PORT: number;
  JWT_SECRET: string;
  MONGO_URI: string;
}

const envSchema = joi.object({
  PORT: joi.number().required(),
  JWT_SECRET: joi.string().required(),
  MONGO_URI: joi.string().required()
}).unknown(true)

const { error, value } = envSchema.validate({
  ...process.env
})

if (error) throw new Error(`Config validation error ${error.message}`)

const envConfig: IEnvConfig = value

export const envs = {
  port: envConfig.PORT,
  jwt_secret: envConfig.JWT_SECRET,
  mongo_uri: envConfig.MONGO_URI
}