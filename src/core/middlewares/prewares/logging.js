import { morganMiddleware } from '../../../utils/logger'
import actuator from 'express-actuator'

const logging_middlewares = [morganMiddleware, actuator()]

export default logging_middlewares
