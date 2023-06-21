import bcrypt from 'bcrypt';
import { ValidationError } from 'express-validation';
import * as jwt from 'jsonwebtoken';
import { QueryFailedError, Repository } from 'typeorm';

import 'dotenv/config';
import {
  AuthResponse,
  AuthenticationRepository,
  ChangePassword,
  Decoded,
  MessageResponse,
  ResetPassword,
} from '../common';
import { User } from '../entities';
import { emailTemplate, transporter } from '../mail';

export class AuthenticationRepositoryImpl implements AuthenticationRepository {
  constructor(private readonly authRepository: Repository<User>) {}

  //Registration
  async register(args: Partial<User>): Promise<User> {
    const user = Object.assign(new User(), {
      ...args,
      confirmPassword: undefined,
    });
    const savedUser = await this.authRepository.save(user);
    return savedUser;
  }

  //Login
  async login(args: Partial<User>): Promise<AuthResponse> {
    try {
      const user = await this.authRepository.findOne({
        where: {
          email: args.email,
        },
      });

      if (!user) {
        return { success: false };
      }

      const isValid = await bcrypt.compare(args.password, user.password);
      if (!isValid) {
        return { success: false };
      }

      const accessToken = jwt.sign(
        {
          id: user.id,
          userUuid: user.userUuid,
          email: user.email,
        },
        process.env.JWT_SECRET_TOKEN,
        { expiresIn: '7d' }
      );
      const refreshToken = jwt.sign(
        {
          user: {
            id: user.id,
            userUuid: user.userUuid,
            email: user.email,
          },
        },
        process.env.JWT_REFRESH_SECRET_TOKEN,
        { expiresIn: '7d' }
      );

      const updatedUser = await this.authRepository.save({
        ...user,
        refreshToken,
      });

      return { user: updatedUser, accessToken, refreshToken, success: true };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new Error('Login failed. Please try again.');
      } else if (error instanceof ValidationError) {
        throw new Error('Invalid login credentials.');
      } else {
        throw new Error('An error occurred during login.');
      }
    }
  }

  //change password
  async changePassword(args: ChangePassword): Promise<MessageResponse> {
    try {
      const { password, currentPassword, userId } = args;
      const user = await this.authRepository.findOne({
        where: {
          userUuid: userId,
        },
      });
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!passwordMatch) {
        return {
          success: false,
          message: 'Current password is incorrect',
        };
      }
      if (currentPassword === password) {
        return {
          success: false,
          message: 'Current password cannot be the same to new password',
        };
      }
      const newPasswordHash = await bcrypt.hash(password, 10);
      user.password = newPasswordHash;
      await this.authRepository.save(user);
      return {
        success: true,
        message: 'Password Updated Successfully',
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'An error occured while updating the password',
      };
    }
  }

  //Logout

  async logout(
    refreshToken: string
  ): Promise<{ success: boolean; message: string }> {
    const user = await this.authRepository.findOne({
      where: {
        refreshToken,
      },
    });

    const foundUser = user?.refreshToken === refreshToken;
    if (!foundUser) {
      return {
        success: false,
        message: `User not found`,
      };
    }
    const userRefreshToken = { ...user, refreshToken: '' };
    await this.authRepository.save(userRefreshToken);
    return {
      success: true,
      message: 'Logout successfully',
    };
  }

  //refresh Token

  async refreshToken(
    refreshToken: string
  ): Promise<{ success: boolean; message: string }> {
    const user = await this.authRepository.findOne({
      where: {
        refreshToken,
      },
    });

    if (!user || user.refreshToken !== refreshToken) {
      return {
        success: false,
        message: `Unauthorized`,
      };
    }
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET_TOKEN || 'secret'
      ) as Decoded;
      if (user.email !== decoded.user.email) {
        return {
          success: false,
          message: `Forbidden`,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Forbidden`,
      };
    }

    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
        },
      },
      process.env.JWT_SECRET_TOKEN || 'secret',
      { expiresIn: '1d' }
    );
    return {
      success: true,
      message: `${accessToken}`,
    };
  }

  //send reset password to email
  async sendPasswordResetEmail(
    email: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const user = await this.authRepository.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return {
          success: false,
          message: 'Email not found',
        };
      }
      const passwordResetToken = Math.random().toString(36).substring(2);
      user.passwordResetToken = passwordResetToken;
      user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour
      await this.authRepository.save(user);

      const mailOptions = {
        from: '"Jayvee" <no-reply@example.com>',
        to: email,
        subject: 'Password Reset Code',
        text: `Please use the following token to reset your password: ${passwordResetToken}`,
        html: emailTemplate(
          passwordResetToken,
          'Password Reset Code',
          'Please use the following token to reset your password:',
          email
        ),
      };

      const sendResult = await transporter.sendMail(mailOptions);
      if (sendResult.accepted.length === 0) {
        return {
          success: false,
          message: 'Failed to send password reset email.',
        };
      }

      return { success: true, message: 'Password reset email sent.' };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'Failed to send password reset email.',
      };
    }
  }

  //reset password
  async resetPassword(
    args: ResetPassword
  ): Promise<{ success: boolean; message: string }> {
    try {
      const { password, token, email } = args;
      const user = await this.authRepository.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return {
          success: false,
          message: `You are not allowed to modify this data`,
        };
      }

      if (!user.passwordResetToken || user.passwordResetToken !== token) {
        return { success: false, message: 'Invalid password reset token.' };
      }

      const passwordResetExpires = new Date(user.passwordResetExpires);
      if (new Date() > passwordResetExpires) {
        return { success: false, message: 'Password reset token has expired.' };
      }

      const hash = await bcrypt.hash(password, 10);
      user.password = hash;
      user.passwordResetToken = null;
      user.passwordResetExpires = null;
      await this.authRepository.save(user);

      return { success: true, message: 'Password reset successful.' };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'Failed to reset email.',
      };
    }
  }
}
