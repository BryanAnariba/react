import 'dotenv/config';
import * as joi from 'joi';
import { EnvVars } from '../interfaces';

const envsSchema = joi.object({
  PORT: joi.number().required(),
  MONGO_URL: joi.string().required(),
  SECRET_KEY: joi.string().required(),
}).unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env
});

if (error) throw new Error(`Sometime went wrong loading the environment vars: ${error}`);

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  mongoUrl: envVars.MONGO_URL,
  secretKey: envVars.SECRET_KEY,
};
