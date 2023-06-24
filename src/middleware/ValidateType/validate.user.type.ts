import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { Role } from '../../common';
import { CustomError } from '../../utils';

export const typeCheckerMiddleware = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
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
      // Extract the token from the request headers
      const decoded: Role = verify(token, secret) as Role;

      // Check if the user has one of the allowed roles
      if (!allowedRoles.includes(decoded?.type)) {
        return res
          .status(403)
          .json({ message: 'You do not have the required role.' });
      }

      // If the user has one of the allowed roles, proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Handle token verification or other errors
      console.error(error);
      res.status(401).json({ message: 'Invalid token.' });
    }
  };
};

//Jayvee Documentation Sample usage
// Apply the roleCheckerMiddleware to the desired routes with the allowed roles
// app.get('/admin-only-route', roleCheckerMiddleware(['admin', 'superadmin'])
