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

const invalidRouteHandler = (req, res, next) => {
  res.status(400)
  res.send(`Invalid route ${req.url}`)
}

export default const errors_MWs = [
    errorLogger,
    errorResponder,
    invalidRouteHandler
  ]; 