/* eslint-disable no-unused-vars */
import { User } from "@user/domain/entities"

export type UserRepository = {
  createUser: (user: User) => Promise<User>
  verifyAccessCredentials: (email: string, password: string) => Promise<User | null>
  updateJWToken: (user: User, token: string) => Promise<User>
  verifyUserEmail: (email: string) => Promise<User | null>
  verifyAccessToken: (token: string) => Promise<User>
  updateOneBy: (by: Partial<User>, update: Partial<User>) => Promise<User>
  findByCodeAndUpdate: (email: string, code: number) => Promise<User>
  updatePicture: (pictureUrl: string, userId: string) => Promise<string>
}
