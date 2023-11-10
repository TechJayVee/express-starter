import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../utils';

const MB = 5; // 5 MB
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

export const fileSizeLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = Object.values(req.files);

  const filesOverLimit: string[] = [];
  // Which files are over the limit?
  Object.keys(files).forEach((key) => {
    if (files[key].size > FILE_SIZE_LIMIT) {
      filesOverLimit.push(files[key].name);
    }
  });

  if (filesOverLimit.length) {
    const properVerb = filesOverLimit.length > 1 ? 'are' : 'is';

    const sentence = `Upload failed. ${filesOverLimit.join(
      ', '
    )} ${properVerb} over the file size limit of ${MB} MB.`;

    const message =
      filesOverLimit.length < 3
        ? sentence.replace(',', ' and')
        : sentence.replace(/,(?=[^,]*$)/, ' and');
    const error = new CustomError(message, 413);
    return next(error);
  }

  next();
};
