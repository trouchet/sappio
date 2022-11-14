import { morganMiddleware, log } from "../../utils/logger.js";
import actuator from "express-actuator";

import { require } from "../../utils/commonjs.js";
import { env } from "../../config/dotenv.js";

const status_monitor = require("express-status-monitor");


export const logging_MWs = [
  morganMiddleware,
  status_monitor(),
  actuator(),
];
