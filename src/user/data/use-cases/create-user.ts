import { User } from "@user/domain/entities"
import { UserRepository, CryptoRepository } from "@user/data/protocols"
import { EmailAlreadyExistsError } from "@user/domain/errors"
import { UnexpectedError } from "@core/generic/domain/errors"
import { UseCase } from "@core/generic/data/protocols"

export class CreateUser implements UseCase<User> {
  constructor(
    private user: User,
    private userRepository: UserRepository,
    private cryptoRepository: CryptoRepository
  ) {}

  async execute(): Promise<User> {
    const existsEmail = await this.userRepository.verifyUserEmail(this.user.email)

    if (existsEmail) {
      throw new EmailAlreadyExistsError()
    }

    const passwordEncrypted = this.cryptoRepository.encryptPassword(this.user.password).toString()

    this.user.password = passwordEncrypted

    const result = await this.userRepository.createUser(this.user)

    if (!result) throw new UnexpectedError()
    return result
  }
}
