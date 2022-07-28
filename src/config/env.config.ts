export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.mongodb || 'mongodb://localhost:27017/nest-pokemon',
  port: process.env.PORT || 3000,
  default_limit: +process.env.DEFAULT_LIMIT || 10,
});
