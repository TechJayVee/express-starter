import { NextFunction, Request, Response } from 'express';

import { RequestUserAuth } from '../../common';
import { authRepository } from '../../providers';
import {
  CustomError,
  errorHandlerWrapper,
  filterUserFields,
} from '../../utils';

export class AuthenticationController {
  //Registration
  static signup = errorHandlerWrapper(async (req: Request, res: Response) => {
    const user = await authRepository.register(req.body);
    return res.send(user);
  });
  //Login
  static login = errorHandlerWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const request = await authRepository.login(req.body);
      if (!request.success) {
        const error = new CustomError('Invalid Credentials', 400);
        return next(error);
      }
      res.cookie('jwt', request.refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      const accessToken = request.accessToken;
      const filterFiedl = filterUserFields(request.user);
      res.send({
        accessToken: accessToken,
        user: filterFiedl,
      });
    }
  );
  //Forgot password
  static forgotPassword = errorHandlerWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email } = req.body;
      const result = await authRepository.sendPasswordResetEmail(email);
      if (!result.success) {
        const error = new CustomError(result.message, 400);
        return next(error);
      }
      return res.json({ message: result.message });
    }
  );

  //Reset Password
  static resetPassword = errorHandlerWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const { confirmPassword, password, token, email } = req.body;
      const passwordResetData = {
        confirmPassword,
        password,
        token,
        email,
      };
      const result = await authRepository.resetPassword(passwordResetData);
      if (!result.success) {
        const error = new CustomError(result.message, 400);
        return next(error);
      }
      return res.json({ message: result.message });
    }
  );

  //Change Password
  static changePassword = errorHandlerWrapper(
    async (req: RequestUserAuth, res: Response, next: NextFunction) => {
      const { password, confirmPassword, currentPassword } = req.body;
      const userId = req.user.userUuid;
      const passwordChangeData = {
        password,
        confirmPassword,
        currentPassword,
        userId,
      };
      const result = await authRepository.changePassword(passwordChangeData);
      if (!result.success) {
        const error = new CustomError(result.message, 400);
        return next(error);
      }
      return res.json({ message: result.message });
    }
  );

  //Logout
  static logOut = errorHandlerWrapper(async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;
    const result = await authRepository.logout(refreshToken);
    if (!result.success) {
      res.clearCookie('jwt', { httpOnly: true });
      return res.sendStatus(204);
    }
    res.clearCookie('jwt', { httpOnly: true });
    return res.sendStatus(204);
  });

  //generate refresh token
  static refreshToken = errorHandlerWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const cookies = req.cookies;
      if (!cookies?.jwt) {
        const error = new CustomError('Unauthorized User', 401);
        return next(error);
      }
      const refreshToken = cookies.jwt;
      const result = await authRepository.refreshToken(refreshToken);
      if (!result.success) {
        const error = new CustomError(result.message, 403);
        return next(error);
      } else {
        return res.json(result.message);
      }
    }
  );
}
