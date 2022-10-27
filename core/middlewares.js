import {
  morganMiddleware
} from 'quivero-api/utils/logging/logger.js';

import express from 'express';
import helmet from 'helmet';
import favicon from 'serve-favicon'
import { rateLimit } from "express-rate-limit";

import { convertTimeDouble } from '../utils/time.js';
import { log } from '../utils/logger.js';

// Time window: 1 minute
const obsvWindow_min = 1;

// Limit each IP to maxRequestCount requests per obsvWindow_min
const maxRequestCount = 5;

const limiter = rateLimit(
  {
    windowMs: convertTimeDouble(obsvWindow_min, 'minute', 'second')*1000,
    max: maxRequestCount, 
    message: "Too many accounts created from this IP, please try again after "+obsvWindow_min+" minutes"
  }
);

export const errorsMiddleware = async (req, res, next) => {
  try {
    await next();
  } catch(err) {
    log('error', err);
    
    res.status = err.status || err.statusCode || 500;
    res.body = { 
        message: err.message || 'Internal Server Error',
        ...Object.keys(err).includes('errors') && {err : err.errors}
    }
    res.app.emit('error', err, res);
  }
}

export const middlewares = [  
  express.json({ extended: true }),
  express.urlencoded({ extended: true }),
  morganMiddleware,
  helmet(),
  favicon(
      process.cwd()+"/"+"public"+"/"+"favicon.ico"
  ),
  errorsMiddleware
];

