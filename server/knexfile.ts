import type { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import { config as convictConfig } from './config';

// Update with your config settings.

const knexConfig: { [key: string]: Knex.Config } = {
    development: {
        client: 'postgresql',
        connection: convictConfig.get('db'),
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
        ...knexSnakeCaseMappers(),
    },
};

export default knexConfig;
