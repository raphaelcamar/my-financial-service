import { NotFoundUserError } from "@user/data/errors"
import { UseCase } from "@core/data/protocols"
import { User } from "@user/domain"
import { UserRepository } from "@user/data/protocols"

export class VerifyAccessToken implements UseCase<User> {
  constructor(private token: string, private userRepository: UserRepository) {}

  async execute(): Promise<User> {
    const user = this.userRepository.verifyAccessToken(this.token)

    if (!user) throw new NotFoundUserError()

    return user
  }
}
