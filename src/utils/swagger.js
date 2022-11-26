import swaggerJSDoc from "swagger-jsdoc";

import { pkg } from "../config/app_info.js";

// Configuration to
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: pkg.name,
      version: pkg.version,
    },
  },
  apis: ["./core/routes/*.js", "./core/app.js", "./utils/app.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
