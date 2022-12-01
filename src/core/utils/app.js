import express from "express";
import swStats from "swagger-stats";
import swaggerUi from "swagger-ui-express";
import { parseExpressApp } from "express-route-parser";

import { swaggerSpec } from "./swagger.js";
import { middlewares } from "../middlewares/bundler.js";
import { errors_MWs } from "../middlewares/errors.js";

export const prepareApp = (app) => {
  const swaggerMW = swStats.getMiddleware({
    swaggerSpec: swaggerSpec,
  });

  app.set("views", process.cwd() + "/src/core/views");
  app.set("view engine", "pug");

  app.use(express.static(process.cwd() + "/src/public"));

  // Swagger middleware
  app.use(swaggerMW);
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
  app.get("/swagger", swaggerUi.setup(swaggerSpec));

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

  for (const middleware of middlewares) {
    app.use(middleware);
  }

  return app;
};

export const routeApp = (app, routers) => {
  for (let router of routers) {
    app.use(router);
  }

  return app;
};

export const pospareApp = (app) => {
  /**
   * Any error handler middleware MUST be added after we define our routes.
   */
  for (const error_middleware of errors_MWs) {
    app.use(error_middleware);
  }

  return app;
};

export const buildApp = (app, routers) => {
  app = prepareApp(app);
  app = routeApp(app, routers);
  app = pospareApp(app);

  return app;
};
