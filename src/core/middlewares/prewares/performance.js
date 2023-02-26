import compression from 'compression';
import { rateLimit } from 'express-rate-limit';
import { convertTimeDouble } from '#utils/time';

// Time window: 1 minute
const obsvWindow_min = 1;
const obsvWindow_ms = convertTimeDouble(obsvWindow_min, 'minute', 'second') * 1000;

// Limit each IP to maxRequestCount requests per obsvWindow_min
const maxRequestCount = 25;

const msg_1 = 'Too many requests from this source!';
const msg_2 = `Please, try again after ${obsvWindow_min} minutes`;

const limiter_options = {
  windowMs: obsvWindow_ms,
  max: maxRequestCount,
  message: msg_1 + msg_2,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
};

const performance_middlewares = [rateLimit(limiter_options), compression()];

export default performance_middlewares;
