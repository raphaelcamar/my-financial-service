import { CryptoRepository } from '@user/data/protocols';

import { User } from '@user/domain/entities/';

export class CreateJWToken {
  private user;

  private cryptoRepository;

  constructor(user: User, cryptoRepository: CryptoRepository) {
    this.user = user;
    this.cryptoRepository = cryptoRepository;
  }

  async execute() {
    const token = await this.cryptoRepository.encryptJwt(this.user);
    return token;
  }
}
