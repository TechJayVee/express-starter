import { NextFunction, Request, Response } from 'express';

import * as fs from 'fs';
import * as path from 'path';

import { CustomError, errorHandlerWrapper } from '../../utils';

export class UploadFileController {
  static uploadFile = errorHandlerWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const files: any[] = Object.values(req.files);

      files.forEach((file) => {
        const uploadDir = path.join(process.cwd(), 'files');
        const originalFilename = file.name;

        const filepath = path.join(uploadDir, originalFilename);

        // Create the directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        file.mv(filepath, (err) => {
          if (err) {
            const error = new CustomError(err, 500);
            return next(error);
          }
        });
      });

      return res.json({
        status: 'success',
        message: Object.keys(files).join(', '),
      });
    }
  );

  static getFile = errorHandlerWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const uploadDir = String(path.join(process.cwd(), 'files'));

      const filename = '3551739.jpg.jpg'; //you should configure it yourseld
      const filePath = path.join(uploadDir, filename);
      console.log(filePath);

      fs.readFile(filePath, (err, data) => {
        if (err) {
          const error = new CustomError('File not found', 404);
          return next(error);
        }

        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader(
          'Content-Disposition',
          `attachment; filename="${filename}"`
        );

        return res.send(data);
      });
    }
  );
}
