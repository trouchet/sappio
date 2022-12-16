/* 
  Required middleware libraries
*/
import logging_middlewares from './logging';
import preparation_middlewares from './preparation';
import validation_middlewares from './validation';
import performance_middlewares from './performance';
import security_middlewares from './security';

/*
  Exported middlewares
*/
let middlewares = [
  logging_middlewares,
  preparation_middlewares,
  validation_middlewares,
  performance_middlewares,
  security_middlewares,
].reduce((acc, arr) => acc.concat(arr), []);;

export default middlewares;
