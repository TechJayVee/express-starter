import { Repository } from 'typeorm';

import { UserRepository } from '../common';
import { User } from '../entities';
import {
  applyFieldSelection,
  applyFilter,
  applyPaging,
  applySorting,
} from '../utils';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly repository: Repository<User>) {}

  async index(args) {
    const query = this.repository.createQueryBuilder('user');
    applyFilter(query, 'user', args?.email);
    applySorting(query, args?.sortBy, args?.sortOrder);
    applyFieldSelection(query, 'user', args.fields);

    if (args.page || args.pageSize) {
      applyPaging(query, args?.page, args?.pageSize);
    }

    const items = await query.getMany();
    return {
      items,
      total: items.length,
      pages: 1,
    };
  }

  async show(args: Partial<User>) {
    const queryBuilder = this.repository.createQueryBuilder('user');
    queryBuilder.where(args);
    const user = await queryBuilder.getOne();
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
