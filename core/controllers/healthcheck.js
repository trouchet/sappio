import { pkg } from "../../config/app_info.js";
import { log } from "../../utils/logger.js";

export const healthCheck = async (req, res, next) => {
  log("debug", "healthCheck controller called");

  res.status = 200;
  res.send({
    message: "Sappio server running",
    version: pkg.version,
  });
};
