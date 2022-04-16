import { UseCase } from "@core/data/protocols"
import { UserRepository } from "@user/data/protocols"
import { User } from "@user/domain/entities"
import { NotFoundUserError } from "@user/domain/errors"

export class FindById implements UseCase<User> {
  constructor(private id: any, private userRepository: UserRepository) {}

  async execute(): Promise<User> {
    const result = await this.userRepository.findById(this.id)
    if (!result) throw new NotFoundUserError()
    return result
  }
}
