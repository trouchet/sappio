import swaggerJSDoc from 'swagger-jsdoc'

import pkg from '../../config/app_info'

// Configuration to
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: pkg.name,
      version: pkg.version
    }
  },
  apis: ['./src/core/routes/*.js', './src/core/utils/app.js']
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
