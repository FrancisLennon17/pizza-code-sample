import { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import buildRouter from '../routes';
import errorHandler from './error-handler';

const applyMiddleware = (app: Express): Express => {
  return app
    .use(cors())
    .use(bodyParser.json())
    .use('/api', buildRouter())
    .use(errorHandler);
};

export default applyMiddleware;