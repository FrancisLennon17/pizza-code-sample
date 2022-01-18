import { isHttpError, BadRequest, HttpError } from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import logger from '../../logger';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const errorHandler = (error: HttpError, req: Request, resp: Response, _: NextFunction): void => {

  if (isHttpError(error) && error.status === 400) {
    resp.status(400).send({
      error: {
        code: 400,
        message: BadRequest,
        details: error.errors || error.message
      }
    });
  } else if (isHttpError(error) && error.status === 404) {
    resp.status(404).send({
      error: {
        code: 404,
        message: 'Not Found',
        details: error.message
      }
    });
  } else if (isHttpError(error) && error.status === 401) {
    resp.status(401).send({
      error: {
        code: 401,
        message: 'Unauthorized'
      }
    });
  } else {
    if (!isHttpError(error)) {
      logger.error(`uncaught error: ${error}`);
    }
    resp.status(500).send({
      error: {
        code: 500,
        message: 'Internal Server Error',
      }
    });
  }
};

export default errorHandler;
