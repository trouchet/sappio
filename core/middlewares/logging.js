import { morganMiddleware, log } from "../../utils/logger.js";
import actuator from "express-actuator";
import pino from "express-pino-logger";

import { require } from "../../utils/commonjs.js";
import { env } from "../../config/dotenv.js";

const status_monitor = require("express-status-monitor");

const status_options = {
  healthChecks: [
    {
      protocol: "http",
      host: env.APP_HOST | "localhost",
      path: "/healthcheck",
      port: env.APP_PORT,
    },
  ],
};

export const logging_MWs = [
  morganMiddleware,
  status_monitor(status_options),
  actuator(),
  pino(),
];
