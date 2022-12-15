import knex from 'knex';

import env from '../config/dotenv';
import knex_config from '../config/knexfile';

const config = knex_config[env.KNEX_ENV || 'development'];
const db = knex(config);

export default db;
