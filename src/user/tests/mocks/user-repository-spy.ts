/* eslint-disable no-unused-vars */
import { UserBuilder } from "@user/builders"
import { UserRepository } from "@user/data"
import { User } from "@user/domain/entities"

export class UserRepositorySpy implements UserRepository {
  async verifyAccessToken(token: string): Promise<User> {
    return new UserBuilder().data
  }

  async findById(id: number): Promise<User> {
    const user: User = null
    return user
  }

  async createUser(user: User): Promise<User> {
    return user
  }

  async verifyAccessCredentials(email: string, password: string): Promise<User | null> {
    const user: User = null
    return user
  }

  async updateJWToken(user: User, token: string): Promise<any> {
    return user
  }

  async verifyUserEmail(email): Promise<User | null> {
    return email === "teste@email.com" ? email : null
  }

  async update(): Promise<any[] | null> {
    return null
  }
}
