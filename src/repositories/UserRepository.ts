import { Repository } from 'typeorm';

import { UserRepository } from '../common';
import { User } from '../entities';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly repository: Repository<User>) {}

  async index() {
    const items = await this.repository.find();
    return {
      items,
      total: items.length,
      pages: 1,
    };
  }

  async show(args: Partial<User>) {
    const user = await this.repository.findOne({
      where: {
        ...args,
      },
    });
    return user;
  }

  async save(args: Partial<User>) {
    const user = await this.repository.save(args);
    return user;
  }

  async update(user: Partial<User>, args: Partial<User>): Promise<User> {
    try {
      const id = user.id;
      await this.repository
        .createQueryBuilder('user')
        .update(User)
        .set(args)
        .where('id = :id', {
          id: id,
        })
        .execute();
      return user as User;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(userUuid: number) {
    try {
      await this.repository
        .createQueryBuilder('user')
        .delete()
        .where('id = :id', {
          id: userUuid,
        })
        .execute();
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
}
