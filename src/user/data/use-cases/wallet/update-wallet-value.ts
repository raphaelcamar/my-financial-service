import { UseCase } from "@core/generic/data/protocols"
import { WalletProtocol } from "@user/data/protocols"
import { Wallet } from "@user/domain/entities"

export class UpdateWalletValue implements UseCase<Wallet> {
  constructor(private walletRepository: WalletProtocol, private walletId: string, private newValue: number) {}

  async execute(): Promise<Wallet> {
    const result = await this.walletRepository.updateWalletValue(this.walletId, this.newValue)

    return result
  }
}
