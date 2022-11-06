import { morganMiddleware, log } from "../../utils/logger.js";
import { require } from "../../utils/commonjs.js";
import { env } from "../../config/dotenv.js";

const status_monitor = require("express-status-monitor");

export const logging_MWs = [
  morganMiddleware,
  status_monitor({
    healthChecks: [
      {
        protocol: "http",
        host: env.APP_HOST | "localhost",
        path: "/healthcheck",
        port: env.APP_PORT,
      },
    ],
  }),
];
