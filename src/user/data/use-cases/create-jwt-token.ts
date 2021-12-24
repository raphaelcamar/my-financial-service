import { CryptoRepository } from '@user/data/protocols';

import { User } from '@user/domain/entities/';

export class CreateJWToken {
  private user;

  private userRepository;

  constructor(user: User, userRepository: CryptoRepository) {
    this.user = user;
    this.userRepository = userRepository;
  }

  async execute() {
    const token = await this.userRepository.encryptJwt(this.user);
    return token;
  }
}
