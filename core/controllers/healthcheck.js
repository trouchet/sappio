import { pkg } from "../../config/app_info.js";
import { log } from "../../utils/logger.js";

export const healthCheck = async (req, res, next) => {
  log("debug", "healthCheck controller called");

  const healthcheck = {
      uptime: process.uptime(),
      message: 'Sappio server running',
      timestamp: Date.now(),
      version: pkg.version,
  };
  
  try {
      res.send(healthcheck);
  } catch (error) {
      healthcheck.message = error;
      res.status(503).send();
  }
};
