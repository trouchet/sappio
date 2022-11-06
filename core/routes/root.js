import express from "express";

export const router = express.Router();

import { getToken } from "../controllers/token.js";
import { healthCheck } from "../controllers/healthcheck.js";
import { routerRoutes } from "../../utils/router.js";
import { log } from "../../utils/logger.js";

// TAKE NOTE: Utilize this to provide created error likeso: next(error)
import createHttpError from "http-errors";

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to sappio, your simple app!
 *     responses:
 *       200:
 *         description: Returns a smile face.
 */
router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

/**
 * @openapi
 * /all:
 *   get:
 *     description: available routes
 *     responses:
 *       200:
 *         description: Returns the available routes.
 */
router.get("/all", function (req, res) {
  res.send(routerRoutes(router).concat(["/swagger", "/status"]));
});

/**
 * @openapi
 * /token:
 *   get:
 *     description: Generates a valid JWT token
 *     responses:
 *       200:
 *         description: Returns a smile face.
 */
router.get("/token", getToken);

/**
 * @openapi
 * /healthcheck:
 *   get:
 *     description: Generates a health object
 *     responses:
 *       200:
 *         description: Returns an object a message and package version
 */
router.get("/healthcheck", healthCheck);

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
