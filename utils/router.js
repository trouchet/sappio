import express from 'express';
import helmet from 'helmet';

import * as dotenv from 'dotenv';

import {
  morganMiddleware,
  agentMorganReporter,
  log_message,
} from 'quivero-api/utils/logging/logger.js';

import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

dotenv.config();

// Use winston agent to report for Logtail
if (process.env.LOGTAIL_TOKEN) {
  const logtail = new Logtail(process.env.LOGTAIL_TOKEN);

  agentMorganReporter.add(
    new LogtailTransport(logtail),
  );
}

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
const APP_PORT = process.env.PORT || 8080;

app.listen(
  APP_PORT,
  () => {
    log_message(agentMorganReporter, 'info', `Listening on port: ${APP_PORT}`);
  },
);
