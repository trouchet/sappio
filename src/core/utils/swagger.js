import swaggerJSDoc from 'swagger-jsdoc';
import pkg from '../../config/app_info';

const packageInfo = {
  title: pkg.name,
  version: pkg.version,
};

const definitionObject = {
  openapi: '3.0.0',
  info: packageInfo,
};

const routeRoutes = [
  './src/core/routes/*.js', 
  './src/core/utils/app.js'
];

// Configuration to
const options = {
  definition: definitionObject,
  apis: routeRoutes,
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;