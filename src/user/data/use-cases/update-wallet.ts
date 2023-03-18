import { UseCase } from "@core/generic/data/protocols/use-case"
import { Wallet } from "@user/domain/entities"
import { WalletProtocol } from "../protocols"

export class UpdateWallet implements UseCase<Wallet> {
  constructor(private wallet: Wallet, private walletRepository: WalletProtocol) {}

  async execute(): Promise<Wallet> {
    const result = await this.walletRepository.update(this.wallet)

    return result
  }
}
