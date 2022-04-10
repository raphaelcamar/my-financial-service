import { UserRepository, CryptoRepository } from "@user/data/protocols"

export class Update {
  constructor(private userRepository: UserRepository, private cryptoRepository: CryptoRepository) {}

  async execute() {
    await this.userRepository.update()
  }
}
