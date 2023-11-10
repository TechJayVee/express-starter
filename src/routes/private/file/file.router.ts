import express from 'express';
import fileUpload from 'express-fileupload';

import { UploadFileController } from '../../../controller';
import {
  fileExtLimiter,
  fileSizeLimiter,
  filesPayloadExists,
} from '../../../middleware';

export const fileUploadRouter = express.Router();

fileUploadRouter.post(
  '/file-upload',
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter(['.png', '.jpg', '.jpeg']),
  fileSizeLimiter,
  UploadFileController.uploadFile
);

fileUploadRouter.get('/file', UploadFileController.getFile);
