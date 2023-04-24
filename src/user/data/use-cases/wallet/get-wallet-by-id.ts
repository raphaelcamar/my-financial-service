import { UseCase } from "@core/generic/data/protocols"
import { WalletProtocol } from "@user/data/protocols"
import { Wallet } from "@user/domain/entities"

export class GetWalletById implements UseCase<Wallet> {
  constructor(private walletRepository: WalletProtocol, private walletId: string) {}

  async execute(): Promise<Wallet> {
    const result = await this.walletRepository.getById(this.walletId)

    return result
  }
}
