import { morganMiddleware } from "../../utils/logger.js";
import actuator from "express-actuator";

export const logging_MWs = [
  morganMiddleware,
  actuator(),
];
