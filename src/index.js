// [START app]
import startServer from './core/server';
import env from './config/env_info';

const port = parseInt(env.APP_PORT, 10) || 3000;
startServer(port);

