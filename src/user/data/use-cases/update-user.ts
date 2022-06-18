import { CryptoRepository, UserRepository } from "@user/data/protocols"
import { UseCase } from "@core/generic/data/protocols"
import { User } from "@user/domain/entities"
import { NotFoundUserError } from "@user/domain/errors"

export class UpdateUser implements UseCase<User> {
  constructor(
    private userRepository: UserRepository,
    private data: Partial<User>,
    private cryptoRepository: CryptoRepository
  ) {}

  async execute(): Promise<User> {
    if (this.data.password) {
      const encrypted = this.cryptoRepository.encryptPassword(this.data.password)
      this.data.password = encrypted
    }

    const user = await this.userRepository.updateOneBy({ email: this.data.email }, { ...this.data })

    if (!user) throw new NotFoundUserError()

    delete user?.password
    delete user?.codeRecover

    return user
  }
}
