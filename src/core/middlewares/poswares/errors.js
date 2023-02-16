import env from '#config/env_info.js';
import { getErrorMessage, getHttpStatusCode, logErrorMessage } from '#cutils/error-handler.js';

const NODE_ENVIRONMENT = env.NODE_ENV || 'development';

export const errorFormatConfig = (response, errorResponse) => {
  return {
    //
    // Callback to run when `Accept` header contains either
    // `application/json` or `*/*`, or if it isn"t set at all.
    //
    'application/json': () => {
      /**
       * Set a JSON formatted response body.
       * Response header: `Content-Type: `application/json`
       */
      response.json({ message: errorResponse.body });
    },
    /**
     * Callback to run when none of the others are matched.
     */
    default: () => {
      /**
       * Set a plain text response body.
       * Response header: `Content-Type: text/plain`
       */
      response.type('text/plain').send(errorResponse.body);
    },
  };
};

/**
 * Generic Express error handler middleware.
 *
 * @param {Error} error - An Error object.
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 * @param {Function} next - Express `next()` function
 */
const errorHandlerMiddleware = (error, request, response, next) => {
  const errorMessage = getErrorMessage(error);

  logErrorMessage(errorMessage);

  /**
   * If response headers have already been sent,
   * delegate to the default Express error handler.
   */
  if (response.headersSent) {
    return next(error);
  } else {
    const errorResponse = {
      statusCode: getHttpStatusCode({ error, response }),
      body: errorMessage,
    };

    /**
     * Set the response status code.
     */
    response.status(errorResponse.statusCode);
  
    /**
     * Send an appropriately formatted response.
     *
     * The Express `res.format()` method automatically
     * sets `Content-Type` and `Vary: Accept` response headers.
     *
     * @see https://expressjs.com/en/api.html#res.format
     *
     * This method performs content negotation.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation
     */
    response.format(errorFormatConfig(response, errorResponse));
  
    /**
     * Ensure any remaining middleware are run.
     */
    next();
  }
};

const error_middlewares = [errorHandlerMiddleware];

export default error_middlewares;
