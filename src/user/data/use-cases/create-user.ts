import { User } from 'src/user/domain';
import { UserRepository } from '@user/data/protocols';
import { InternalError } from '@user/data/errors';

export class CreateUser {
  private user;

  private userRepository;

  constructor(user: User, userRepository: UserRepository) {
    this.user = user;
    this.userRepository = userRepository;
  }

  async createUser(): Promise<User> {
    const result = await this.userRepository.createUser(this.user);
    if (!result) {
      throw new InternalError('Um erro interno aconteceu');
    } else {
      return result;
    }
  }
}
