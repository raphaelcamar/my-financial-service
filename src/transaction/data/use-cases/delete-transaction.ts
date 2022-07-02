import { TransactionRepository } from "@transaction/data/protocols"
import { UseCase } from "@core/generic/data/protocols"
import { DeleteTransactionError } from "@transaction/domain/errors"

export class DeleteTransaction implements UseCase<void> {
  constructor(
    private transactionRepository: TransactionRepository,
    private userId: string,
    private transactionId: string
  ) {}

  async execute(): Promise<void> {
    const wasDeleted = await this.transactionRepository.deleteTransaction(
      this.userId,
      this.transactionId
    )

    if (!wasDeleted) throw new DeleteTransactionError()
  }
}
