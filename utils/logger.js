import {
  morganMiddleware,
  agentMorganReporter,
  log_message
} from 'quivero-api/utils/logging/logger.js';

import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

import * as dotenv from 'dotenv';

import _ from 'lodash'

dotenv.config();

// Use winston agent to report for Logtail
if (process.env.LOGTAIL_TOKEN) {
  const logtail = new Logtail(process.env.LOGTAIL_TOKEN);

  agentMorganReporter.add(new LogtailTransport(logtail));
}


export const logger = agentMorganReporter

export const log = (type, msg) => log_message(logger, type, msg);