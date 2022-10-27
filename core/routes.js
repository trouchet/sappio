import express from 'express';

export const router = express.Router();

import { swaggerSpec } from '../utils/swagger.js';
import { middlewares } from './middlewares.js'

for(const middleware of middlewares) {
    router.use(middleware)
}

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
  res.send(':)');
});


