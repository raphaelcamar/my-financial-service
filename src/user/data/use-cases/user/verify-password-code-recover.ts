import { UserRepository } from "@user/data/protocols"
import { UseCase } from "@core/generic/data/protocols"
import { WrongCodeError } from "@user/domain/errors"
import { User } from "@user/domain/entities"

export class VerifyPasswordCodeRecover implements UseCase<User> {
  constructor(private userRepository: UserRepository, private code: number, private email: string) {}

  async execute() {
    const user = await this.userRepository.findByCodeAndUpdate(this.email, this.code)

    if (!user) throw new WrongCodeError()

    return user
  }
}
