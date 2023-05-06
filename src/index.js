// [START app]
import app from './core/app.js';
import startServer from './core/server.js';
import env from '#config/env_info.js';

const port = parseInt(env.APP_PORT, 10);
startServer(app, port);
