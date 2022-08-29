/* eslint-disable no-return-assign */
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

  updateOneBy(by: Partial<User>, update: Partial<User>): Promise<User | null> {
    const hasUser = Object.keys(by).some(key => this.user?.[key] === by?.[key])

    if (!hasUser) return null

    Promise.resolve(Object.keys(update).forEach(key => (this.user[key] = update[key])))

    return Promise.resolve(this.user)
  }

  findByCodeAndUpdate(email: string, code: number): Promise<User> {
    const hasUser = this.user.email === email
    const hasUserWithCode = this.user?.codeRecover === code

    if (this.user?.email === email && this.user?.codeRecover === code) {
      this.user = { ...this.user, codeRecover: null } as User
      return Promise.resolve(this.user)
    }
    return null
  }

  async updatePicture(pictureUrl: string, userId: string) {
    return Promise.resolve(pictureUrl)
  }
}
