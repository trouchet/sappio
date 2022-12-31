import env from "../../config/env_info";
import pkg from "../../config/app_info";
import log from "../../utils/logger";

export const healthCheck = async (req, res, next) => {
  log("debug", "healthCheck controller called");

  res.send({
    uptime: process.uptime(),
    message: `Server ${env.APP_NAME} is running!`,
    now_timestamp: Date.now(),
    version: pkg.version,
  });

  return next();
};
