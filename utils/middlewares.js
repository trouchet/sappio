import {
  logger
} from './logger.js';

import {
  log_message,
} from 'quivero-api/utils/logging/logger.js';

export const errorsMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch(err) {
    log_message(logger, 'error', err);
    
    ctx.status = err.status || err.statusCode || 500;

    ctx.body = { 
        message: err.message || 'Internal Server Error',
        ...Object.keys(err).includes('errors') && {err : err.errors}
    }
  }

  ctx.app.emit('error', err, ctx);
}

