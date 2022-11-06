import knex from "knex";
import knex_config from "../config/knexfile.js";

export const db = knex(knex_config[process.env.KNEX_ENV || "test"]);
