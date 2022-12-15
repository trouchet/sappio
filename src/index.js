// [START app]
import startServer from './core/server';
import env from './config/dotenv';
import LogRocket from 'logrocket';

const port = parseInt(env.APP_PORT) || 3000;
startServer(port);

LogRocket.init('mo72ga/sappio');
