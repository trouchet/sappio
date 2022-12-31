/*
  Required pre-request response middleware libraries
*/
import logging_middlewares from './prewares/logging';
import preparation_middlewares from './prewares/preparation';
import validation_middlewares from './prewares/validation';
import performance_middlewares from './prewares/performance';
import security_middlewares from './prewares/security';

/*
  Exported middlewares
*/
const prewares = [
  logging_middlewares,
  preparation_middlewares,
  validation_middlewares,
  performance_middlewares,
  security_middlewares,
].reduce((acc, arr) => acc.concat(arr), []);

export default prewares;
