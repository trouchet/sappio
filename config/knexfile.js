import * as dotenv from "dotenv";

dotenv.config("./config/.env");

import path from "path";

const BASE_PATH = process.cwd() + "/" + "db";

const docker_connection = {
  connection: {
    host: "sappio_db",
    database: "sappio",
    user: "docker_username",
    password: "docker_password",
  },
};

const test_connection = {
  connection: {
    host: "localhost",
    database: "sappio",
    user: "postgres",
    password: "postgres",
  },
};

const prod_connection = {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

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
  },
};

export const knex_config = {
  docker: {
    ...base_knex_env_config,
    connection: docker_connection,
  },
  test: {
    ...base_knex_env_config,
    connection: test_connection,
  },
  prod: {
    ...base_knex_env_config,
    connection: prod_connection,
  },
};
