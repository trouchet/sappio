/*
  Required pos-request response middleware libraries
*/
import error_middlewares from './poswares/errors'

/*
  Exported middlewares
*/
const poswares = [
  error_middlewares,
].reduce((acc, arr) => acc.concat(arr), []);

export default poswares;
