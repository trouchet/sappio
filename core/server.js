import express from "express";
import swStats from "swagger-stats";

import { log } from "../utils/logger.js";
import { router } from "./routes/root.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../utils/swagger.js";
import { middlewares } from "./middlewares/bundler.js";
import { errors_MWs } from "./middlewares/errors.js";

import { parseExpressApp } from 'express-route-parser';


const app = express();

app.set("views", process.cwd() + "/core/views");
app.set("view engine", "pug");

app.use(express.static(process.cwd() + "/public"));

// Swagger middleware
app.use(
  swStats.getMiddleware(
    {
      swaggerSpec: swaggerSpec
    }
  ));

app.use("/swagger", swaggerUi.serve);

/**
 * @openapi
 * /swagger:
 *   get:
 *     description: routes description
 *     responses:
 *       200:
 *         description: Returns the swagger of available routes.
 */
router.get("/swagger", swaggerUi.setup(swaggerSpec))


for (const middleware of middlewares) {
  app.use(middleware);
}

app.use(router);

/**
 * Any error handler middleware MUST be added after we define our routes.
 */
for (const error_middleware of errors_MWs) {
  app.use(error_middleware);
}

/**
 * @openapi
 * /all:
 *   get:
 *     description: available routes
 *     responses:
 *       200:
 *         description: Returns the available routes.
 */
app.get("/all", function (req, res) {
  res.send(parseExpressApp(app));
});



// Listen to the App Engine-specified port, otherwise 8080
const APP_PORT = process.env.APP_PORT || 8080;

app.listen(APP_PORT, () => {
  log("info", `Listening on port: ${APP_PORT}`);
});

export default app;
