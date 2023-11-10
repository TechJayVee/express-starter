import { Request } from 'express';

import { User } from '../../entities';

export interface Pagination {
  skip?: number;
  take?: number;
  perPage?: number;
  page?: number;
  totalPages?: number;
  search?: string;
  currentpage?: string;
}

export interface AuthResponse {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  success?: boolean;
}

export interface ChangePassword {
  password: string;
  confirmPassword: string;
  currentPassword: string;
  userId: string;
}

export interface MessageResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

export interface BaseUserInfo {
  id?: number;
  email?: string;
  userUuid?: string;
}

export interface Decoded {
  user: BaseUserInfo;
}

export interface ResetPassword {
  confirmPassword: string;
  password: string;
  token: string;
  email: string;
}

export interface RequestUserAuth extends Request {
  user: BaseUserInfo;
}
export interface RequestWithFile extends Request {
  file: Express.Multer.File;
}

export interface Role {
  type?: string;
  userId?: string;
  role?: string[];
}
