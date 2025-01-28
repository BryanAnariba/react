import 'dotenv/config';
import * as joi from 'joi';
import { EnvironmentVars } from '../interfaces';

const environmentSchema = joi.object({
  PORT: joi.number().required(),
  MONGO_URI: joi.string().required(),
}).unknown(true);

const {error, value} = environmentSchema.validate({
  ...process.env,
});

if (error) throw new Error(`Sometime went wrong loading the environment vars: ${error}`);

const environmentVarsValue: EnvironmentVars = value;

export const environmentVars = {
  port: environmentVarsValue.PORT,
  mongoUri: environmentVarsValue.MONGO_URI,
}