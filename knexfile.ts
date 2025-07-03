import { Knex } from 'knex';
import 'dotenv/config';
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'db/migrations',
  },
  seeds: {
    directory: 'db/seeds',
  },
};

export default config;
