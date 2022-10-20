import express from 'express';

import { 
  morganMiddleware,
} from 'quivero-api/utils/logging/logger.js';

import { 
  statusMW,
} from './middlewares/status.js';

import helmet from "helmet";

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

app.listen(APP_PORT, () => {
  console.log(`Listening on port: ${APP_PORT}`);
});

