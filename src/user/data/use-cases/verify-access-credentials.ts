import { UseCase } from "@core/generic/data/protocols"
import { UserRepository, CryptoRepository } from "@user/data/protocols"
import { User } from "@user/domain/entities"
import { CredentialsError } from "@user/domain/errors"

export class VerifyAccessCredentials implements UseCase<User> {
  constructor(
    private email: string,
    private password: string,
    private userRepository: UserRepository,
    private cryptoRepository: CryptoRepository
  ) {}

  async execute(): Promise<User> {
    const encrypt = this.cryptoRepository.encryptPassword(this.password)

    const result = await this.userRepository.verifyAccessCredentials(this.email, encrypt)

    if (!result) {
      throw new CredentialsError()
    }
    return result
  }
}
