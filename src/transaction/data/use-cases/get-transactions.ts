import { Transaction } from "@transaction/domain"
import { TransactionRepository } from "@transaction/data/protocols"
import { UseCase } from "@core/data/protocols"
import { UnexpectedError } from "@core/data"

export class GetTransactions {
  constructor(private userId: string, private transactionRepository: TransactionRepository) {}

  async execute(): Promise<Transaction[]> {
    const result = await this.transactionRepository.getTransactions(this.userId)
    if (!result) throw new UnexpectedError()

    return result
  }
}
