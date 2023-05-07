import * as winston from 'winston';
import morgan from 'morgan';
import env from '#config/env_info.js';

/*
 * import json from 'morgan-json';
 */
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

const { createLogger, format, transports } = winston;
const { label } = format;

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
  const parser = (info) => {
    const time_prefix = `[${info.timestamp} - ${label_msg}]`;
    const info_suffix = `${info.level}: ${info.message}`;

    return `${time_prefix} - ${info_suffix}`;
  };

  const format_config = format.combine(
    label({ label: label_msg }),
    format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss.ss' }),
    format.colorize(),
    format.printf(parser)
  );

  const console_transport = new transports.Console({
    format: format.errors(),
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  });

  const logger_setup = {
    format: format_config,
    transports: [console_transport],
    exceptionHandlers: [console_transport],
    rejectionHandlers: [console_transport],
  };

  return createLogger(logger_setup);
};

export const log_message = (logger, level, message) => {
  logger.log({ level, message });
};

export const reporter = logging(env.APP_NAME);

// Use winston agent to report for Logtail
if (env.LOGTAIL_TOKEN) {
  const logtail_transport = new LogtailTransport(new Logtail(env.LOGTAIL_TOKEN));

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

/**
 * @abstract logs a message with reporter on given logging type
 *
 * @param {String} task_msg
 */
const log = (type, msg) => log_message(reporter, type, msg);

/**
 * @abstract report a silly message
 *
 * @param {String} msg
 */
export const joke = (msg) => log('silly', msg);

/**
 * @abstract throw an error with prescribed unable task message
 *
 * @param {String} task_msg
 */
export const raise = (msg, errorClass = Error) => {
  log('error', msg);
  throw new errorClass(msg);
};

/**
 * @abstract throw an error with prescribed unable task message
 *
 * @param {String} task_msg
 */
export const warn = (msg) => log('warn', msg);

/**
 * @abstract throw an error with prescribed unable task message
 *
 * @param {String} task_msg
 */
export const report = (msg) => log('info', msg);

/**
 * @abstract throw an error with prescribed unable task message
 *
 * @param {String} task_msg
 */
export const debug = (msg) => log('debug', msg);

export default log;
