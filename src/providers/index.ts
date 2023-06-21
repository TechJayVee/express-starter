import { AppDataSource } from '../data-source';
import { User } from '../entities';
import {
  AuthenticationRepositoryImpl,
  UserRepositoryImpl,
} from '../repositories';

export const userRepository = new UserRepositoryImpl(
  AppDataSource.getRepository(User)
);
export const authRepository = new AuthenticationRepositoryImpl(
  AppDataSource.getRepository(User)
);
