import swaggerJSDoc from 'swagger-jsdoc';
import pkg from './app_info.js';

const packageInfo = {
  title: pkg.name,
  version: pkg.version,
  description: pkg.description,
  license: {
    name: pkg.license,
    url: "https://github.com/trouchet/sappio/blob/main/LICENSE",
  },
  contact: {
    name: pkg.author,
    email: "brunolnetto@gmail.com",
  },
};

const definitionObject = {
  openapi: '3.0.0',
  info: packageInfo,
};

const swaggerRoutes = ['./src/core/routers/*.js', './src/core/utils/app.js'];

// Configuration to
const options = {
  definition: definitionObject,
  apis: swaggerRoutes,
  info: packageInfo
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
