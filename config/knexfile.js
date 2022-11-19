import { env } from './dotenv.js'
import path from 'path'

const BASE_PATH = process.cwd()+"/"+"db";

const base_knex_env_config = {
  client: "pg",
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: path.join(BASE_PATH, "migrations"),
  },
  seeds: {
    directory: path.join(BASE_PATH, "seeds"),
  }
}

const test_connection = {
  connection: {
    host: "localhost",
    database: "sappio",
    user: "postgres",
    password: "postgres",
  }
}

const prod_connection = {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
}

let knex_config = {};

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default knex_config = {
  development: {
          ...base_knex_env_config, 
          connection: test_connection
        },
  production: {
          ...base_knex_env_config, 
          connection: prod_connection
        },
};

