import compression from 'compression'
import { rateLimit } from "express-rate-limit";

import { convertTimeDouble } from '../../utils/time.js';

// Time window: 1 minute
const obsvWindow_min = 1;

// Limit each IP to maxRequestCount requests per obsvWindow_min
const maxRequestCount = 5;

const msg_1 = "Too many requests from this source!"
const msg_2 = "Please, try again after "+obsvWindow_min+" minutes"

const limiter = rateLimit(
  {
    windowMs: convertTimeDouble(obsvWindow_min, 'minute', 'second')*1000,
    max: maxRequestCount, 
    message: msg_1+msg_2
  }
);

export const performance_MWs = [ 
		limiter, 
		compression() 
	]
