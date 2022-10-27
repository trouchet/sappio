import { log } from '../utils/logger.js';
import { router } from './routes.js';
import express from 'express';
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from '../utils/swagger.js'

export const app = express();

app.use(router);
app.use('/docs-api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Listen to the App Engine-specified port, otherwise 8080
const APP_PORT = process.env.APP_PORT || 8080;

app.listen(
  APP_PORT,
  () => {
    log('info', `Listening on port: ${APP_PORT}`);
  },
);
