import express from 'express';

export const router = express.Router();

import { swaggerSpec } from '../../utils/swagger.js';
import { middlewares } from '../middlewares/bundler.js'

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


/**
 * import { Validator } from "express-json-validator-middleware";
 * const { validate } = new Validator();

/**
 * The `validate` method accepts an object which maps request
 * properties to the JSON schema you want them to be validated
 * against e.g.
 *
 * { requestPropertyToValidate: jsonSchemaObject }
 *
 * Validate `request.body` against `addressSchema`.
 */
/**
app.post("/address", validate({ body: addressSchema }), (request, response) => {
  // Route handler logic to run when `request.body` has been validated.
   
  response.send({});
});
**/