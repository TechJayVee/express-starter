import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

import 'dotenv/config';
import { BaseUserInfo, RequestUserAuth } from '../../common';
import { CustomError } from '../../utils';

export const validateJWT = (
  req: RequestUserAuth,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new CustomError(
      'Unauthorized: Missing or invalid token',
      401
    );
    return next(error);
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET_TOKEN;
  if (!secret) {
    const error = new CustomError(
      'Internal Server Error: Missing secret token',
      500
    );
    return next(error);
  }

  try {
    const decoded: BaseUserInfo = verify(token, secret) as BaseUserInfo;
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const error = new CustomError('Unauthorized: Invalid token', 401);
      return next(error);
    } else if (err.name === 'JsonWebTokenError') {
      const error = new CustomError('Unauthorized: Invalid token', 401);
      return next(error);
    }
    const error = new CustomError('Internal Server Error: Invalid token', 500);
    return next(error);
  }
};

export default validateJWT;
