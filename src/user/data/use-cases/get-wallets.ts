import { UseCase } from "@core/generic/data/protocols"
import { Wallet } from "@user/domain/entities"
import { WalletProtocol } from "../protocols"

export class GetWallets implements UseCase<Wallet[]> {
  constructor(private userId: string, private walletRepository: WalletProtocol) {}

  async execute(): Promise<Wallet[]> {
    const result = await this.walletRepository.getWallets(this.userId)
    return result
  }
}
