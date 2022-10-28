import express from 'express';

import { log } from '../utils/logger.js';
import { router } from './routes/root.js';

import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from '../utils/swagger.js'
import { middlewares } from './middlewares/bundler.js'

const app = express();

// Swagger middleware
router.use(
  '/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec)
);

for(const middleware of middlewares) {
    app.use(middleware)
}

app.use(router);

// Listen to the App Engine-specified port, otherwise 8080
const APP_PORT = process.env.APP_PORT || 8080;

app.listen(
  APP_PORT,
  () => {
    log('info', `Listening on port: ${APP_PORT}`);
  },
);

export default app;
