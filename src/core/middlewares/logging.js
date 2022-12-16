import { morganMiddleware } from '../../utils/logger';
import actuator from 'express-actuator';

export let logging_middlewares = [];

logging_middlewares = [
  morganMiddleware,
  actuator(),
]

export default logging_middlewares;
