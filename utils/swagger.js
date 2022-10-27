import swaggerJSDoc from 'swagger-jsdoc';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const pkg = require('../package.json');

 // Configuration to  
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: pkg.name,
      version: pkg.version,
    },
  },
  apis: ['./core/routes.js'],
};
 
export const swaggerSpec = swaggerJSDoc(options);
