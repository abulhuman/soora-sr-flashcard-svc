import * as Joi from 'joi';

export const appConfigSchema = {
  GRPC_SVC_PORT: Joi.number().default(50052),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  DATABASE_URL: Joi.string().required(),
};

export const appConfigConstants = {
  GRPC_SVC_PORT: 'GRPC_SVC_PORT',
  NODE_ENV: 'NODE_ENV',
  DATABASE_URL: 'DATABASE_URL',
} as const;
