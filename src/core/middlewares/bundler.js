/* 
  Required middleware libraries
*/
import { logging_MWs } from './logging';
import { preparation_MWs } from './preparation';
import { validation_MWs } from './validation';
import { performance_MWs } from './performance';
import { security_MWs } from './security';

/*
  Exported middlewares
*/
export const middlewares = [
  preparation_MWs,
  validation_MWs,
  logging_MWs,
  performance_MWs,
  security_MWs,
].reduce((acc, arr) => acc.concat(arr), []);
