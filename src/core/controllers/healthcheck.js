import env from '#config/env_info';
import pkg from '#config/app_info';
import log from '#utils/logger';

export const healthCheck = async (req, res, next) => {
  log('debug', 'Controller healthCheck called');

  const uptime = process.uptime();
  const now = Date.now();
  const start = now - uptime;

  const health_info = {
    start: start,
    uptime: uptime,
    now: now,
    message: `Server ${env.APP_NAME} is running!`,
    version: pkg.version,
  };

  res.send(health_info);

  return next();
};
