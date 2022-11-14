import { log } from "./logger.js";

/**
 * Extract an error stack or error message from an Error object.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
 *
 * @param {Error} error
 * @return {string} - String representation of the error object.
 */
export const getErrorMessage = (error) => {
  /**
   * If it exists, prefer the error stack as it usually
   * contains the most detail about an error:
   * an error message and a function call stack.
   */
  if (error.stack) {
    return error.stack;
  }

  if (typeof error.toString === "function") {
    return error.toString();
  }

  return "";
};

/**
 * Log an error message to stderr.
 *
 * @see https://nodejs.org/dist/latest-v14.x/docs/api/console.html#console_console_error_data_args
 *
 * @param {string} error
 */
export const logErrorMessage = (error) => {
  log("error", error);
};

/**
 * Determines if an HTTP status code falls in the 4xx or 5xx error ranges.
 *
 * @param {number} statusCode - HTTP status code
 * @return {boolean}
 */
export const isErrorStatusCode = (statusCode) => {
  return statusCode >= 400 && statusCode < 600;
};

/**
 * Look for an error HTTP status code (in order of preference):
 *
 * - Error object (`status` or `statusCode`)
 * - Express response object (`statusCode`)
 *
 * Falls back to a 500 (Internal Server Error) HTTP status code.
 *
 * @param {Object} options
 * @param {Error} options.error
 * @param {Object} options.response - Express response object
 * @return {number} - HTTP status code
 */
export const getHttpStatusCode = ({ error, response }) => {
  /**
   * Check if the error object specifies an HTTP
   * status code which we can use.
   */
  const statusCodeFromError = error.status || error.statusCode;
  if (isErrorStatusCode(statusCodeFromError)) {
    return statusCodeFromError;
  }

  /**
   * The existing response `statusCode`. This is 200 (OK)
   * by default in Express, but a route handler or
   * middleware might already have set an error HTTP
   * status code (4xx or 5xx).
   */
  const statusCodeFromResponse = response.statusCode;
  if (isErrorStatusCode(statusCodeFromResponse)) {
    return statusCodeFromResponse;
  }

  /**
   * Fall back to a generic error HTTP status code.
   * 500 (Internal Server Error).
   *
   * @see https://httpstatuses.com/500
   */
  return 500;
};

export const reportMerror = (code, message, properties) => {
  return new Merror(code, message, properties);
};
