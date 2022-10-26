import {
  morganMiddleware,
  agentMorganReporter,
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

