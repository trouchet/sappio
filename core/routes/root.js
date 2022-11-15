import express from "express";

export const router = express.Router();

import { getToken } from "../controllers/token.js";
import { healthCheck } from "../controllers/healthcheck.js";
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
 * @openapi
 * /health:
 *   get:
 *     description: server status
 *     responses:
 *       200:
 *         description: Returns a json file with current server status.
 */

 /**
 * @openapi
 * /info:
 *   get:
 *     description: current server info
 *     responses:
 *       200:
 *         description: Returns a json file with current server info.
 */

 /**
 * @openapi
 * /swagger-stats:
 *   get:
 *     description: swagger descriptive request statistics
 *     responses:
 *       200:
 *         description: Returns a descriptive application swagger with request statistics.
 */