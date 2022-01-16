import swaggerJSDoc = require('swagger-jsdoc');
import path from 'path';

const swaggerDoc = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Francis\' NodeJs Test API - Pizza',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
    ],
  },
  apis: [path.join(__dirname, './router/routes.ts')]
});

export default swaggerDoc;
