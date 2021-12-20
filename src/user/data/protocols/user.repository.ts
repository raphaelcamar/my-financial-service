/* eslint-disable no-unused-vars */
import { User } from '@user/domain';

export type UserRepository = {
  findById: (id: number) => Promise<User>
  createUser: (user: User) => Promise<User>;
}
