import { UnexpectedError } from "@core/generic/domain/errors"
import { WalletProtocol } from "@user/data/protocols"
import { Wallet } from "@user/domain/entities"
import { Wallet as WalletSchema } from "@user/infra/db/schemas"

export class WalletRepositoryData implements WalletProtocol {
  async create(wallet: Wallet): Promise<Wallet> {
    const walletSchema = new WalletSchema(wallet)

    const result = await walletSchema.save().catch(() => {
      throw new UnexpectedError()
    })

    return new Wallet(result as unknown as Wallet)
  }

  async getWallets(userId: string): Promise<Wallet[]> {
    const result: any = await WalletSchema.find({ userId })
    return result as Wallet[]
  }

  async update(wallet: Wallet): Promise<any> {
    const result = await WalletSchema.updateOne({ id: wallet.id }, wallet).catch(err => {
      throw new UnexpectedError(err)
    })

    return result
  }
}
