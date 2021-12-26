import { UserRepository, CryptoRepository } from '@user/data/protocols';

export class Update {
  private userRepository;

  private cryptoRepository;

  constructor(
    userRepository: UserRepository,
    cryptoRepository: CryptoRepository,
  ) {
    this.cryptoRepository = cryptoRepository;
    this.userRepository = userRepository;
  }

  async execute() {
    await this.userRepository.update();
  }
}
