/* 
  Required middleware libraries
*/
import { logging_MWs } from './logging.js';
import { misc_MWs } from './misc.js';
import { validation_MWs } from './validation.js';
import { performance_MWs } from './performance.js';
import { security_MWs } from './security.js';

/*
  Exported middlewares
*/
export const middlewares = [
  misc_MWs,
  validation_MWs,
  logging_MWs,
  performance_MWs,
  security_MWs
].reduce((acc, arr) => acc.concat(arr), []);
