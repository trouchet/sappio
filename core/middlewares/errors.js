import { log } from '../../utils/logger.js';

// Error handling Middleware functions
const errorLogger = (error, req, res, next) => {
  log('error', `error ${error.message}`) 
  
  // call next middleware
  next(error)
}

const errorResponder = (error, req, res, next) => {
  res.header("Content-Type", 'application/json')
  
  const status = error.status || 400 || 500
  response.status(status).send(error.message)
  log('error', error.message)
}

export const errors_MWs = [
    errorLogger,
    errorResponder
  ]; 
