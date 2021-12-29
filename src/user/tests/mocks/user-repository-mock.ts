import { UserRepository } from '@user/data';
import { User } from '@user/domain';

export class UserRepositoryMock implements UserRepository {
  async findById(id: number): Promise<User> {
    return new Promise(() => {});
  }

  async createUser(user:User): Promise<User> {
    return new Promise(() => {});
  }

  async verifyAccessCredentials(email: string, password: string): Promise<User | null> {
    return new Promise(() => {});
  }

  async updateJWToken(user: User, token: string): Promise<any> {
    return new Promise(() => {});
  }

  async verifyUserEmail(email): Promise<User | null> {
    return new Promise(() => {});
  }

  async update(): Promise<any[] | null> {
    return new Promise(() => {});
  }
}
