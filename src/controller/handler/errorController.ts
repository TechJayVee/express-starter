/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../utils';

const devErrors = (res: Response, error: CustomError) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const castErrorHandler = (err: any) => {
  const msg = `Invalid value for ${err.path}: ${err.value}!`;
  return new CustomError(msg, 400);
};

const duplicateKeyErrorHandler = (err: any) => {
  const msg = `Bad Request Duplicate Value Error`;

  return new CustomError(msg, 400);
};

const validationErrorHandler = (err: any) => {
  const errors = Object.values(err.errors).map((val: any) => val.message);
  const errorMessages = errors.join('. ');
  const msg = `Invalid input data: ${errorMessages}`;

  return new CustomError(msg, 400);
};

const prodErrors = (res: Response, error: CustomError) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong! Please try again later.',
    });
  }
};

export const globalErrorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    devErrors(res, error);
    console.log(error);
  } else if (process.env.NODE_ENV === 'production') {
    if (error.name === 'CastError') error = castErrorHandler(error);
    if (
      error.message.includes('duplicate key value violates unique constraint')
    ) {
      error = duplicateKeyErrorHandler(error);
    }
    if (error.name === 'ValidationError') error = validationErrorHandler(error);

    prodErrors(res, error);
  }
};
