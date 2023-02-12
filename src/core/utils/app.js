import swStats from 'swagger-stats';
import swaggerUi from 'swagger-ui-express';
import { parseExpressApp } from 'express-route-parser';

import swaggerSpec from './swagger';
import poswares from '../middlewares/poswares_bundler';
import prewares from '../middlewares/prewares_bundler';

const setupEngine = (app) => {
  app.set('views', process.cwd() + '/src/core/views');
  app.set('view engine', 'pug');
};

const prepareApp = (app) => {
  prewares.reduce((app, middleware) => app.use(middleware), app);
};

const routeApp = (app, routers) => {
  routers.reduce((app, router) => app.use(router), app);
};

const pospareApp = (app) => {
  /**
   * Any error handler middleware MUST be added after we define our routes.
   */
  poswares.reduce((app, error_middleware) => app.use(error_middleware), app);
};

const fermataApp = (app) => {
  /**
   * @openapi
   * /swagger:
   *   get:
   *     description: routes description
   *     responses:
   *       200:
   *         description: Returns the swagger of available routes.
   */

  // const swaggerMW = swStats.getMiddleware(swaggerSpec);
  // app.use(swaggerMW);

  app.use('/swagger', swaggerUi.serve);
  app.get('/swagger', swaggerUi.setup(swaggerSpec));

  /**
   * @openapi
   * /all:
   *   get:
   *     description: available routes
   *     responses:
   *       200:
   *         description: Returns the available routes.
   */
  app.get('/all', function (req, res) {
    res.send(parseExpressApp(app));
  });
};

export const buildApp = (app, routers) => {
  setupEngine(app);

  prepareApp(app);
  routeApp(app, routers);
  pospareApp(app);

  fermataApp(app);

  return app;
};
