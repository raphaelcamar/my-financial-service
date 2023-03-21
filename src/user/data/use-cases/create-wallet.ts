import { UseCase } from "@core/generic/data/protocols"
import { Wallet } from "@user/domain/entities"
import { WalletProtocol } from "../protocols"

export class CreateWallet implements UseCase<Wallet> {
  constructor(private wallet: Wallet, private walletRepository: WalletProtocol) {}

  async execute(): Promise<Wallet> {
    const result = await this.walletRepository.create(this.wallet)
    return result
  }
}
