import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../utils';

export const filesPayloadExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files) {
    const error = new CustomError('Missing files', 400);
    return next(error);
  }
  next();
};
