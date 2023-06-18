interface BaseUser {
  firstName: string;
  middleName?: string;
  lastName: string;
}

interface BaseTimestamp {
  updatedAt: Date;
  createdAt: Date;
}

interface BaseId {
  id: string;
}

export interface MessageResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

export interface ResetPassword {
  confirmPassword: string;
  password: string;
  token: string;
  email: string;
}
export interface ChangePassword {
  newPassword: string;
  verifyPassword: string;
  currentPassword: string;
  userId: string;
}

export interface User extends BaseId, BaseUser, BaseTimestamp {}
