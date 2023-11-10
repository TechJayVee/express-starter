import { NextFunction, Request, Response } from 'express';

import * as path from 'path';

import { CustomError } from '../../utils';

export const fileExtLimiter = (allowedExtArray: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const files: any[] = Object.values(req.files);

    const fileExtensions: string[] = [];
    files.forEach((file) => {
      fileExtensions.push(path.extname(file.name));
    });
    console.log(files);

    // Are the file extensions allowed?
    const allowed = fileExtensions.every((ext) =>
      allowedExtArray.includes(ext)
    );

    if (!allowed) {
      const message = `Upload failed. Only ${allowedExtArray.join(
        ', '
      )} files allowed.`;

      const error = new CustomError(message, 413);
      return next(error);
    }

    next();
  };
};
