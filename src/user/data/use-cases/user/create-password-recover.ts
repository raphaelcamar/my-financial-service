import { UseCase } from "@core/generic/data/protocols"
import { createCode } from "@core/generic/utils"
import { UserRepository } from "@user/data/protocols"
import { NotFoundUserError } from "@user/domain/errors"

export class CreatePasswordRecover implements UseCase<number> {
  constructor(private userRepository: UserRepository, private email: string) {}

  async execute(): Promise<number> {
    const code = createCode(111111, 999999)

    const user = await this.userRepository.updateOneBy({ email: this.email }, { codeRecover: code })

    if (!user) throw new NotFoundUserError()

    setTimeout(async () => {
      await this.userRepository.updateOneBy({ email: this.email }, { codeRecover: null })
    }, 3 * 60 * 1000) // 3 minutes

    return code
  }
}
