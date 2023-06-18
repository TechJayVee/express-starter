import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { UserRepositoryImpl } from '../repositories/UserRepository';

export const userRepository = new UserRepositoryImpl(
  AppDataSource.getRepository(User)
);
