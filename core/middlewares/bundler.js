/* 
  Required middleware libraries
*/
import { errors_MWs } from './errors.js';
import { logging_MWs } from './logging.js';
import { misc_MWs } from './misc.js';
import { performance_MWs } from './performance.js';
import { security_MWs } from './security.js';

/*
  Exported middlewares
*/
export const middlewares = [
  misc_MWs,
  errors_MWs,
  logging_MWs,
  performance_MWs,
  security_MWs
].reduce((acc, arr) => acc.concat(arr), []);
