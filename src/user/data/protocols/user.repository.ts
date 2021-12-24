/* eslint-disable no-unused-vars */
import { User } from '@user/domain';

export type UserRepository = {
  findById: (id: number) => Promise<User>
  createUser: (user: User) => Promise<User>;
  verifyAccessCredentials: (email: string, password: string) => Promise<User | null>;
  updateJWToken: (user: User, token: string) => Promise<any>
  verifyUserEmail: (email: string) => Promise<User | null>
}
