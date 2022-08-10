import convict from 'convict';
import { config as envConfig } from 'dotenv';

envConfig();

const config = convict({
  db: {
    user: {
      doc: 'DB User',
      env: 'DB_USER',
      default: 'username',
    },
    password: {
      doc: 'DB Password',
      env: 'DB_PASSWORD',
      default: 'password',
    },
    database: {
      doc: 'DB Name',
      env: 'DB_NAME',
      default: 'games library',
    },
    host: {
      env: 'DB_HOST',
      format: 'String',
      default: 'localhost',
    },
    port: {
      env: 'DB_PORT',
      format: 'port',
      default: 5432,
    },
  },
  salt: {
    env: 'SALT_ROUNDS',
    format: 'int',
  },
});

config.validate();

export { config };
