import express from 'express';
import helmet from 'helmet';
import favicon from 'serve-favicon'
import path from 'path'
import { rateLimit } from "express-rate-limit";
import title from 'express-title';

import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import { convertTimeDouble } from './time.js';

import { morganMiddleware, log_message, } from 'quivero-api/utils/logging/logger.js';
import { errorsMiddleware } from './middlewares.js';
import { logger } from './logger.js';

const obsvWindow_min = 1;
const maxRequestCount = 5;

const limiter = rateLimit({
    windowMs: convertTimeDouble(obsvWindow_min, 'minute', 'second')*1000  , // 15 minutes
    max: maxRequestCount, // limit each IP to 100 requests per windowMs
    message: "Too many accounts created from this IP, please try again after "+obsvWindow_min+" minutes"

  });

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

// [START logger]
app.use(limiter); //  apply to all requests
// [END logger]

// [START favicon]
app.use(
  favicon(
    process.cwd()+"/"+"public"+"/"+"favicon.ico"
  )
)
// [END favicon]

// [START title]
app.set('title', 'Sappio');
// [END title]

// Listen to the App Engine-specified port, or 8080 otherwise
const APP_PORT = process.env.APP_PORT || 8080;

app.listen(
  APP_PORT,
  () => {
    log_message(logger, 'info', `Listening on port: ${APP_PORT}`);
  },
);
