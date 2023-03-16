import { Wallet } from "@user/domain/entities"

export type WalletProtocol = {
  create: (wallet: Wallet.Data) => Promise<Wallet>
}
