/* 
  Required middleware libraries
*/
import { logging_MWs } from "./logging.js";
import { preparation_MWs } from "./preparation.js";
import { validation_MWs } from "./validation.js";
import { performance_MWs } from "./performance.js";
import { security_MWs } from "./security.js";

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
