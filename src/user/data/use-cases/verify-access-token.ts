import { NotFoundUserError } from "@user/domain/errors"
import { UseCase } from "@core/data/protocols"
import { User } from "@user/domain/entities"
import { UserRepository } from "@user/data/protocols"

export class VerifyAccessToken implements UseCase<User> {
  constructor(private token: string, private userRepository: UserRepository) {}

  async execute(): Promise<User> {
    const user = await this.userRepository.verifyAccessToken(this.token)

    if (!user) throw new NotFoundUserError()

    return user
  }
}
