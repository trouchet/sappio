// [START app]
import { startServer } from "./core/server.js";
import env from "./config/dotenv.js";
import LogRocket from "logrocket";

const port = parseInt(env.APP_PORT) || 3000;

startServer(port);

LogRocket.init("mo72ga/sappio");
