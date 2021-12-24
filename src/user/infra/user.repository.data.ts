import { UserRepository } from '@user/data/protocols';
import { User } from '@user/domain/entities/';
import { User as UserSchema } from './db/schemas';

export class UserRepositoryData implements UserRepository {
  async createUser(user: User) {
    // Fazer validação do usuário
    // gerar jwt
    const userSchema = new UserSchema(user);
    const result = await userSchema.save();
    return result;
  }

  async findById(id: number) {
    const result = await UserSchema.findById(id);
    return result;
  }

  async verifyAccessCredentials(email: string, password: string) {
    const result = await UserSchema.findOne({
      password,
      email,
    });

    return result;
  }

  async updateJWToken(user: User, token: string) {
    const result = await UserSchema.updateOne({ _id: user.id }, { token }, { new: true });
    return result;
  }
}
