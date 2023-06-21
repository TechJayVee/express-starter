import express from 'express';

import { AuthenticationController } from '../../../controller';
import { changePasswordSchema, validateRequestSchema } from '../../../schema';

export const AuthuserRouter = express.Router();

AuthuserRouter.put(
  '/change-password',
  changePasswordSchema,
  validateRequestSchema,
  AuthenticationController.changePassword
);

AuthuserRouter.post('/refresh-token', AuthenticationController.refreshToken);
