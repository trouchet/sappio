import express from 'express';

import { getToken } from '../controllers/token.js';
import { healthCheck } from '../controllers/healthcheck.js';

const router = express.Router();

// TAKE NOTE: Utilize this to provide created error likeso: next(error)
// import createHttpError from "http-errors";

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to sappio, your simple app!
 *     responses:
 *       200:
 *         description: Returns a smile face.
 */
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

/**
 * @openapi
 * /token:
 *   post:
 *     description: Generates a valid JWT token
 *     responses:
 *       200:
 *         description: Returns an object.
 */
router.post('/token', getToken);

/**
 * @openapi
 * /healthcheck:
 *   get:
 *     description: Generates a health object
 *     responses:
 *       200:
 *         description: Returns an object a message and package version
 */
router.get('/healthcheck', healthCheck);

/**
 * @openapi
 * /health:
 *   get:
 *     description: Server status
 *     responses:
 *       200:
 *         description: Returns a json file with current server status.
 */

/**
 * @openapi
 * /info:
 *   get:
 *     description: Current server info
 *     responses:
 *       200:
 *         description: Returns a json file with current server info.
 */

export default router;
