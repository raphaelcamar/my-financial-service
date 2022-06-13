import { UseCase } from "@core/generic/data/protocols"
import { CryptoRepository } from "@user/data/protocols"

import { User } from "@user/domain/entities"

export class CreateJWToken implements UseCase<string> {
  constructor(private user: User, private cryptoRepository: CryptoRepository) {}

  async execute(): Promise<string> {
    const token = await this.cryptoRepository.encryptJwt(this.user)
    return token
  }
}
