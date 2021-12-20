import { UserRepository } from '@user/data/protocols';
import { User } from '@user/domain/entities/';
import { User as UserSchema } from './db/schemas';

export class UserRepositoryData implements UserRepository {
  async createUser(user: User): Promise<User> {
    const userSchema = new UserSchema(user);
    const result = await userSchema.save();
    return result;
  }

  async findById(id: number): Promise<User> {
    const result = await UserSchema.findById(id).orFail(() => {
      throw new Error('DEU RUIM');
    });
    return result;
  }
}
