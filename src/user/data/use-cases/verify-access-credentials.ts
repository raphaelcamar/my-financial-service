import { UserRepository } from '@user/data/protocols';
import { User } from '@user/domain';
import { CredentialsError } from '../errors/credentials-error';

export class VerifyAccessCredentials {
  private userRepository;

  private email;

  private password;

  constructor(email: string, password: string, userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.email = email;
    this.password = password;
  }

  async verifyAccessCredentials(): Promise<User> {
    const result = await this.userRepository.verifyAccessCredentials(this.email, this.password);

    if (!result) {
      throw new CredentialsError();
    }
    return result;
  }
}
