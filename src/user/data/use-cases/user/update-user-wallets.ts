import { UseCase } from "@core/generic/data/protocols"
import { UserRepository } from "@user/data/protocols"
import { User, Wallet } from "@user/domain/entities"

export class UpdateUserWallets implements UseCase<User> {
  constructor(private userRepository: UserRepository, private wallet: Wallet) {}

  async execute(): Promise<User> {
    const user = await this.userRepository.updateUserWallets(this.wallet)

    return user
  }
}
