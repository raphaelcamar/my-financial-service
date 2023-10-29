import { UseCase } from "@core/generic/data/protocols"
import { UserRepository } from "@user/data/protocols"

export class ChangeCurrentWallet implements UseCase<void> {
  constructor(private userId: string, private walletId: string, private userRepository: UserRepository) {}

  async execute(): Promise<void> {
    await this.userRepository.changeCurrentWallet(this.userId, this.walletId)
  }
}
