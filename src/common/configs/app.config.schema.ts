import * as Joi from 'joi';

export const appConfigSchema = {
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  DATABASE_URL: Joi.string().required(),
};

export const appConfigConstants = {
  NODE_ENV: 'NODE_ENV',
  DATABASE_URL: 'DATABASE_URL',
} as const;
