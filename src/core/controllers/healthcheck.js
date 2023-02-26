import env from '#config/env_info';
import pkg from '#config/app_info';
import { debug } from '#utils/logger';

export const healthCheck = async (req, res, next) => {
  debug('Controller healthCheck called');

  const uptime = process.uptime();
  const now = Date.now();
  const start = Math.floor(now - uptime);

  const health_info = {
    start: start,
    now: now,
    uptime: uptime,
    message: `Server ${env.APP_NAME} is running!`,
    version: pkg.version,
  };

  res.send(health_info);

  return next();
};
