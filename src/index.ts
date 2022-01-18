// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import http = require('http');
import express = require('express');
import swaggerUi from 'swagger-ui-express';

import swaggerDoc from './openapi';
import logger from './logger';
import applyMiddleware from './router/middleware';
import databaseConnect from './db';

const start = async () => {
  try {
    databaseConnect.get();
    let app = express();
    //swagger
    const uiSetup = swaggerUi.setup(swaggerDoc);
    app.get('/api-docs', uiSetup);
    app.get('/api-docs/index.html', uiSetup);
    app.use('/api-docs', swaggerUi.serve);
    app = applyMiddleware(app);
    const port = process.env.PORT || 8000;
    const server = http.createServer(app);
    await server.listen(port);
  } catch (err) {
    logger.error(`error starting server: ${err}`);
  }
};

start();