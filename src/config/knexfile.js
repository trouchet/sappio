import env from './dotenv';
import path from 'path';

const BASE_PATH = process.cwd() + '/' + 'db';

const base_knex_env_config = {
  client: 'pg',
  pool: {
    min: 2,
    max: 40,
    acquireTimeoutMillis: 60000,
    idleTimeoutMillis: 600000,
  },
  migrations: {
    directory: path.join(BASE_PATH, 'migrations'),
  },
  seeds: {
    directory: path.join(BASE_PATH, 'seeds'),
  },
};

const dev_connection = {
  connection: {
    host: 'localhost',
    database: 'sappio_db',
    user: env.POSTGRES_USER || 'postgres',
    password: env.POSTGRES_PASSWORD || 'postgres',
    port: 5432,
  },
};

const docker_connection = {
  connection: {
    host: env.POSTGRES_HOST || 'localhost',
    database: 'sappio_db',
    user: env.POSTGRES_USER || 'postgres',
    password: env.POSTGRES_PASSWORD || 'postgres',
    port: 5432,
  },
};

const prod_connection = {
  host: env.POSTGRES_HOST,
  database: env.POSTGRES_DATABASE,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  port: env.POSTGRES_PORT,
};

let knex_config = {};

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default knex_config = {
  development: {
    ...base_knex_env_config,
    connection: dev_connection,
  },
  docker: {
    ...base_knex_env_config,
    connection: docker_connection,
  },
  production: {
    ...base_knex_env_config,
    connection: prod_connection,
  },
};
