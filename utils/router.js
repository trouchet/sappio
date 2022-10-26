import express from 'express';
import helmet from 'helmet';

import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

import {
  morganMiddleware,
  log_message,
} from 'quivero-api/utils/logging/logger.js';

import {
  errorsMiddleware
} from './middlewares.js';

import {
  logger
} from './logger.js';

export const app = express();

// [START enable_parser]
// This middleware is available in Express v4.16.0 onwards
// parse application/json
app.use(express.json({ extended: true }));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// [END enable_parser]

// [START logger]
app.use(morganMiddleware);
// [END logger]

// [START logger]
app.use(helmet());
// [END logger]

// Listen to the App Engine-specified port, or 8080 otherwise
const APP_PORT = process.env.APP_PORT || 8080;

app.listen(
  APP_PORT,
  () => {
    log_message(logger, 'info', `Listening on port: ${APP_PORT}`);
  },
);
