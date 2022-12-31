import * as winston from 'winston';
import morgan from 'morgan';

/*
 * import json from 'morgan-json';
 */
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

const { createLogger, format, transports } = winston;
const { label } = format;

import env from '../config/env_info';

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
  const log_info_parser = (info) => {
    const time_prefix = `[${info.timestamp} - ${label_msg}]`;
    const info_suffix = `${info.level}: ${info.message}`;

    return `${time_prefix} - ${info_suffix}`;
  };

  const format_object = format.combine(
    label({ label: label_msg }),
    format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss.ss' }),
    format.colorize(),
    format.printf(log_info_parser)
  )

  const console_transport = new transports.Console(
    {
      format: format.errors(),
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }
  )

  const logger_setup = {
    format: format_object,
    transports: [ console_transport ],
    exceptionHandlers: [ console_transport ],
    rejectionHandlers: [ console_transport ],
  };

  return createLogger(logger_setup);
};

export const log_message = (logger__, level, message) => {
  logger__.log({ level, message, });
};

const logging_default_name = 'morgan';
export const reporter = logging(logging_default_name);

// Use winston agent to report for Logtail
if (env.LOGTAIL_TOKEN) {
  const logtail = new Logtail(env.LOGTAIL_TOKEN);

  const logtail_transport = new LogtailTransport(logtail);

  reporter.add(logtail_transport);
}

morgan.token('type', (req, res) => {
  return req.headers['content-type'];
});

const morgan_format =
  ':type :method :status :url :res[content-length] bytes :response-time ms :total-time ms';

const stream_channels = {
  stream: {
    // Configure Morgan to use our custom logger with custom severity
    write: (message) => reporter.log('info', message),
  },
};

/**
 * @abstract Morgan middleware to log app access
 *
 */
export const morganMiddleware = morgan(morgan_format, stream_channels);

const log = (type, msg) => log_message(reporter, type, msg);

export default log;
