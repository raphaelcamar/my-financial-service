import { TransactionProtocol } from "@user/data/protocols"
import { UseCase } from "@core/generic/data/protocols"
import { DeleteTransactionError } from "@transaction/domain/errors"

export class DeleteTransaction implements UseCase<void> {
  constructor(private transactionRepository: TransactionProtocol, private userId: string, private transactionId: string, private walletId: string) {}

  async execute(): Promise<void> {
    const wasDeleted = await this.transactionRepository.deleteTransaction(this.transactionId, this.userId, this.walletId)

    if (!wasDeleted) throw new DeleteTransactionError()
  }
}
