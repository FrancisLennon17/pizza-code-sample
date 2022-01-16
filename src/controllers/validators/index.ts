import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export function isValidSchema(req: Request, res: Response, next: NextFunction): Maybe<Response> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      error: {
        code: 400,
        message: 'Bad Request',
        details: errors.array()
      }
    });
  }
  next();
}

export * from './order.validator';
