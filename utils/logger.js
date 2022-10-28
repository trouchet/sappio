import * as winston from 'winston';
import morgan from 'morgan';
import json from 'morgan-json';

import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

import * as dotenv from 'dotenv';

dotenv.config(
  {
    path: process.cwd()+'/config/.env'
  }
);

const {
  createLogger,
  format,
  transports,
  config,
} = winston;

const {
  combine, timestamp, label, printf,
} = format;

/*
  We may define our own logging level. The default are given below
  by property config.syslog.levels
  const my_levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
  };
*/

/**
 * @abstract Log to defined transports
 *
 * @param {String} label_msg
 */
export const logging = (label_msg = 'default') => {
  const logger_setup = {
    format: format.combine(
      label({ label: label_msg }),
      format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss.sss A' }),
      format.colorize(),
      format.printf((info) => `[${info.timestamp} - ${label_msg}] ${info.level}: ${info.message}`),
    ), transports: [
      new transports.Console()
    ],
    exceptionHandlers: [
      new transports.Console({
        format: format.errors(),
      }),
    ], rejectionHandlers: [
      new transports.Console()
    ],
  };

  const logger_ = createLogger(logger_setup);

  return logger_;
};

export const log_message = (logger__, level, message) => {
  logger__.log({
    level,
    message,
  });
};

export const agentMorganReporter = logging('morgan');

// Use winston agent to report for Logtail
if (process.env.LOGTAIL_TOKEN) {
  const logtail = new Logtail(process.env.LOGTAIL_TOKEN);

  agentMorganReporter.add(new LogtailTransport(logtail));
}

const morgan_format = json(
  ':method :url :status :res[content-length] bytes :response-time ms'
);

const stream_channels  = {
    stream: {
      // Configure Morgan to use our custom logger with custom severity
      write: (message) => agentMorganReporter.log('info', message),
    },
  };

/**
 * @abstract Morgan middleware to log app access
 *
 */
export const morganMiddleware = morgan(morgan_format, stream_channels);

export const logger = agentMorganReporter
export const log = (type, msg) => log_message(logger, type, msg);