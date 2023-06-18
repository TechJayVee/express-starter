import { User } from '../../entities';

import { Pagination } from './interface';

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
