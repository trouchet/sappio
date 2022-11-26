import { Validator, ValidationError } from "express-json-validator-middleware";

/**
 * Error handler middleware for handling errors of the
 * `ValidationError` type which are created by
 * `express-json-validator-middleware`. Will pass on
 * any other type of error to be handled by subsequent
 * error handling middleware.
 *
 * @see https://expressjs.com/en/guide/error-handling.html
 *
 * @param {Error} error - Error object
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 * @param {Function} next - Express next function
 */
export const validationErrorMiddleware = (error, request, response, next) => {
  /**
   * If response headers have already been sent,
   * delegate to the default Express error handler.
   */
  if (response.headersSent) {
    return next(error);
  }

  /**
   * If the `error` object is not a `ValidationError` created
   * by `express-json-validator-middleware`, we'll pass it in
   * to the `next()` Express function and let any other error
   * handler middleware take care of it. In our case this is
   * the only error handler middleware, so any errors which
   * aren't of the `ValidationError` type will be handled by
   * the default Express error handler.
   *
   * @see https://expressjs.com/en/guide/error-handling.html#the-default-error-handler
   */
  const isValidationError = error instanceof ValidationError;
  if (!isValidationError) {
    return next(error);
  }

  /**
   * We'll send a 400 (Bad Request) HTTP status code in the response.
   * This let's the client know that there was a problem with the
   * request they sent. They will normally implement some error handling
   * for this situation.
   *
   * We'll also grab the `validationErrors` array from the error object
   * which `express-json-validator-middleware` created for us and send
   * it as a JSON formatted response body.
   *
   * @see https://httpstatuses.com/400
   */
  response.status(400).json({
    errors: error.validationErrors,
  });

  next();
};

export const validation_MWs = [validationErrorMiddleware];
