import { Transaction } from "@transaction/domain"
import { TransactionRepository } from "@transaction/data/protocols"
import { UseCase } from "@core/data/protocols"
import { UnexpectedError } from "@core/data"

export class CreateTransaction implements UseCase<Transaction> {
  constructor(
    private transaction: Transaction,
    private transactionRepository: TransactionRepository
  ) {}

  async execute(): Promise<Transaction> {
    const result = await this.transactionRepository.create(this.transaction)
    if (!result) throw new UnexpectedError()

    delete result.userId

    return result
  }
}
