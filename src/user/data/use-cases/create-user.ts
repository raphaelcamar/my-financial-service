import { User } from "@user/domain"
import { UserRepository, CryptoRepository } from "@user/data/protocols"
import { EmailAlreadyExistsError } from "@user/data/errors"
import { UnexpectedError } from "@core/data"

export class CreateUser {
  private user

  private userRepository

  private cryptoRepository

  constructor(user: User, userRepository: UserRepository, cryptoRepository: CryptoRepository) {
    this.user = user
    this.userRepository = userRepository
    this.cryptoRepository = cryptoRepository
  }

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
