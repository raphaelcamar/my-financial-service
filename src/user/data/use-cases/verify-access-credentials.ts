import { UserRepository, CryptoRepository } from '@user/data/protocols';
import { User } from '@user/domain';
import { CredentialsError } from '../errors/credentials-error';

export class VerifyAccessCredentials {
  private userRepository;

  private email;

  private password;

  private cryptoRepository;

  constructor(
    email: string,
    password: string,
    userRepository: UserRepository,
    cryptoRepository: CryptoRepository,
  ) {
    this.userRepository = userRepository;
    this.email = email;
    this.password = password;
    this.cryptoRepository = cryptoRepository;
  }

  async execute(): Promise<User> {
    const encrypt = this.cryptoRepository.encryptPassword(this.password);

    const result = await this.userRepository.verifyAccessCredentials(this.email, encrypt);

    if (!result) {
      throw new CredentialsError();
    }
    return result;
  }
}
