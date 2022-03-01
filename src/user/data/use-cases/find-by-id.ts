import { UserRepository } from "@user/data/protocols/user.repository"
import { NotFoundUserError } from ".."

export class FindById {
  private id: any

  private userRepository

  constructor(id: any, userRepository: UserRepository) {
    this.id = id
    this.userRepository = userRepository
  }

  async execute() {
    const result = await this.userRepository.findById(this.id)
    if (!result) throw new NotFoundUserError()
    return result
  }
}
