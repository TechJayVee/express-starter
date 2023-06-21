import express from 'express';

import { AuthenticationController } from '../../../controller';
import {
  forgotPasswordSchema,
  loginSchema,
  resetTokenSchema,
  signupSchema,
  validateRequestSchema,
} from '../../../schema';

export const AuthuserRouter = express.Router();

AuthuserRouter.post(
  '/register',
  signupSchema,
  validateRequestSchema,
  AuthenticationController.signup
);

AuthuserRouter.post(
  '/login',
  loginSchema,
  validateRequestSchema,
  AuthenticationController.login
);

// AuthuserRouter.post(
//   '/social-login',
//   socialLoginSchema,
//   validateRequestSchema,
//   AuthenticationController.loginWithSocial
// );

AuthuserRouter.post('/refresh-token', AuthenticationController.refreshToken);

AuthuserRouter.post('/logout', AuthenticationController.logOut);

AuthuserRouter.post(
  '/forgot-password',
  forgotPasswordSchema,
  validateRequestSchema,
  AuthenticationController.forgotPassword
);

AuthuserRouter.post(
  '/reset-password',
  resetTokenSchema,
  validateRequestSchema,
  AuthenticationController.resetPassword
);
