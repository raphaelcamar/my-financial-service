/* eslint-disable no-unused-vars */
import { UserBuilder } from "@user/builders"
import { UserRepository } from "@user/data/protocols"
import { User } from "@user/domain/entities"

export class UserRepositorySpy implements UserRepository {
  private user: User

  async verifyAccessToken(token: string): Promise<User> {
    if (token === this.user.token) return this.user

    return null
  }

  async findById(id: number): Promise<User> {
    const user: User = null
    return user
  }

  async createUser(user: User): Promise<User> {
    this.user = user
    return user
  }

  async verifyAccessCredentials(email: string, password: string): Promise<User | null> {
    if (this.user.email === email && this.user.password === password) {
      return this.user
    }
    return null
  }

  async updateJWToken(user: User, token: string): Promise<User> {
    return user
  }

  async verifyUserEmail(email: string): Promise<User | null> {
    return email === "teste@teste.com" ? this.user : null
  }

  async update(): Promise<any[] | null> {
    return null
  }
}
