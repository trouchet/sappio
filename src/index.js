// [START app]
import { startServer } from "./core/app.js";
import { env } from "./config/dotenv.js";

const server = startServer(parseInt(env.APP_INIT_PORT) || 3000);
