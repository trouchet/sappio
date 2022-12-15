import swStats from 'swagger-stats';
import swaggerUi from 'swagger-ui-express';
import { parseExpressApp } from 'express-route-parser';

import swaggerSpec from './swagger';
import middlewares from '../middlewares/bundler';
import error_middlewares from '../middlewares/errors';

export const prepareApp = (app) => {
  const swaggerMW = swStats.getMiddleware({
    swaggerSpec: swaggerSpec,
  });

  app.set('views', process.cwd() + '/src/core/views');
  app.set('view engine', 'pug');

  // Swagger middleware
  app.use(swaggerMW);
  app.use('/swagger', swaggerUi.serve);

  /**
   * @openapi
   * /swagger:
   *   get:
   *     description: routes description
   *     responses:
   *       200:
   *         description: Returns the swagger of available routes.
   */
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

  return middlewares.reduce(
    (app, middleware) => app.use(middleware), 
    app
  );
};

export const routeApp = (app, routers) => {
  return routers.reduce(
    (app, router) => app.use(router), 
    app
  );
};

export const pospareApp = (app) => {
  /**
   * Any error handler middleware MUST be added after we define our routes.
   */
  return error_middlewares.reduce(
    (app, error_middleware) => app.use(error_middleware), 
    app
  );
};

export const buildApp = (app, routers) => pospareApp(
  routeApp(
    prepareApp(app), 
    routers
  )
);

