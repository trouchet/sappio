import knex from 'knex'

import { env } from '../config/dotenv.js'
import knex_config from "../config/knexfile.js";

const config = knex_config[env.KNEX_ENV || 'development'];

let db = {};

export default db = knex(config);