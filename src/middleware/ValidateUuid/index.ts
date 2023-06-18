import { NextFunction, Request, Response } from 'express';
import { validate as isUuid } from 'uuid';

export const validateUUID = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (id && !isUuid(id)) {
    return res.status(400).json({ message: 'Invalid UUID' });
  }
  next();
};
