import { UserRepository } from "@user/data/protocols"
import { UseCase } from "@core/generic/data/protocols"
import { WrongCodeError } from "@user/domain/errors"

export class VerifyPasswordCodeRecover implements UseCase<void> {
  constructor(
    private userRepository: UserRepository,
    private code: number,
    private email: string
  ) {}

  async execute() {
    const user = await this.userRepository.updateOneBy(
      { email: this.email, codeRecover: this.code },
      { codeRecover: null }
    )

    if (!user) throw new WrongCodeError()
  }
}
