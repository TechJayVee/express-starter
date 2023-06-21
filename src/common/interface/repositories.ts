import { User } from '../../entities';

import {
  AuthResponse,
  ChangePassword,
  MessageResponse,
  Pagination,
} from './interface';

interface BaseAuthRepository<T, Args> {
  register?: (args: Args) => Promise<T>;
  login?: (args: Args) => Promise<AuthResponse>;
  sendPasswordResetEmail?: (email: string) => Promise<MessageResponse>;
  resetPassword?: (args: Args) => Promise<MessageResponse>;
  changePassword?: (args: ChangePassword) => Promise<MessageResponse>;
  logout?: (refreshToken: string) => Promise<MessageResponse>;
  refreshToken?: (refreshToken: string) => Promise<MessageResponse>;
}

export interface BaseRepository<T, Args> {
  index?: (
    pagination?: Pagination,
    genericID?: string
  ) => Promise<{
    items: T[];
    total: number;
    pages: number;
  }>;
  show?: (args?: Args, genericID?: string) => Promise<T>;
  store?: (args: Args) => Promise<T>;
  update?: (args?: Args, genericArgs?: Args) => Promise<T>;
  delete?: (id: string | number) => Promise<void>;
  findExistingRecord?: (args?: Args, genericID?: string) => Promise<T>;
}

export type UserRepository = BaseRepository<User, Partial<User>>;
export type AuthenticationRepository = BaseAuthRepository<User, Partial<User>>;
