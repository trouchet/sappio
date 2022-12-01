// [START app]
import { startServer } from "./core/app.js";
import { env } from "./config/dotenv.js";

const port = parseInt(env.APP_INIT_PORT) || 3000;

const server = startServer(port);	
