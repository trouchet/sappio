import { morganMiddleware } from '../../utils/logger';
import actuator from 'express-actuator';

export const logging_MWs = [];

export default logging_MWs = [
  morganMiddleware, 
  actuator(),
];
