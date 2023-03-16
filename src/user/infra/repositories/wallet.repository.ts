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

    return new Wallet(result)
  }
}
