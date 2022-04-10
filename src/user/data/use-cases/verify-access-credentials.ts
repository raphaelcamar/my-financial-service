import { UseCase } from "@core/data/protocols"
import { UserRepository, CryptoRepository } from "@user/data/protocols"
import { User } from "@user/domain"
import { CredentialsError } from "../errors/credentials-error"

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
